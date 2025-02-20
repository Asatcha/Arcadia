import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  input,
  output,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Animal } from '../../../models/animal.model';
import { map, Observable, startWith } from 'rxjs';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { VetReportService } from '../../../services/vet-report.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { VetReport } from '../../../models/vet-report.model';

@Component({
  selector: 'arcadia-vet-report-creation',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    MatTimepickerModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './vet-report-edit.component.html',
  styleUrl: './vet-report-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VetReportEditComponent {
  animals = input.required<Animal[]>();
  animalNames = input.required<string[]>();
  reloadAnimals = output<void>();
  private fb = inject(FormBuilder).nonNullable;
  private vetReportService = inject(VetReportService);
  filteredAnimalNames$!: Observable<string[]>;
  private _injector = inject(Injector);
  animalHasNoVetReport$ = signal(true);
  isLoading$ = signal(true);
  readonly panelOpenState$ = signal(false);

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  vetReportForm: FormGroup = this.fb.group({
    id: [0],
    date: ['', [Validators.required]],
    food: ['', [Validators.required, Validators.maxLength(20)]],
    foodWeight: [undefined, [Validators.required]],
    status: ['', [Validators.required, Validators.maxLength(50)]],
    details: ['', [Validators.maxLength(200)]],
    animalId: [0],
  });

  name = new FormControl<string>('');

  ngOnInit() {
    this.loadNameFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['animals'] || changes['animalNames']) {
      this.loadNameFilter();
    }
  }

  triggerResize() {
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      },
    );
  }

  displayFn(name: string): string {
    return name;
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLocaleLowerCase();

    return this.animalNames().filter((name) =>
      name.toLocaleLowerCase().includes(filterValue),
    );
  }

  loadNameFilter() {
    this.filteredAnimalNames$ = this.name.valueChanges.pipe(
      startWith(''),
      map((name) => {
        return name ? this._filter(name) : this.animalNames().slice();
      }),
    );
  }

  findAnimalByName(name: string | null) {
    const animal = this.animals().find(
      (animal) => animal.name.toLocaleLowerCase() === name?.toLocaleLowerCase(),
    );

    if (animal) {
      this.vetReportForm.patchValue({
        id: animal.latestVetReport.id,
        date: animal.latestVetReport.date,
        food: animal.latestVetReport.food,
        foodWeight: animal.latestVetReport.foodWeight,
        animalId: animal.id,
      });
    } else {
      console.error('Aucun animal trouvé avec ce nom');
    }
  }

  checkAnimalHasVetReport(name: string | null) {
    const animal = this.animals().find(
      (animal) => animal.name.toLocaleLowerCase() === name?.toLocaleLowerCase(),
    );

    this.animalHasNoVetReport$.set(!animal || !animal.latestVetReport);
  }

  onBackButton() {
    this.isLoading$.set(true);
    this.vetReportForm.reset();
  }

  onResetButton(stepper: MatStepper) {
    stepper.reset();
    this.vetReportForm.reset();
    this.loadNameFilter();
  }

  updateVetReportByAnimalId() {
    this.isLoading$.set(true);

    if (!this.vetReportForm.valid) {
      return;
    }

    this.vetReportService
      .updateVetReportById(this.vetReportForm.value)
      .subscribe({
        next: () => {
          this.isLoading$.set(false);
          this.reloadAnimals.emit();
        },
      });
  }
}
