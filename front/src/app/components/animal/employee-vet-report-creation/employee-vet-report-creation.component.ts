import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
  SimpleChanges,
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

@Component({
  selector: 'arcadia-employee-vet-report-creation',
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
  templateUrl: './employee-vet-report-creation.component.html',
  styleUrl: './employee-vet-report-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeVetReportCreationComponent {
  animals = input.required<Animal[]>();
  animalNames = input.required<string[]>();
  reloadAnimals = output<void>();
  private fb = inject(FormBuilder).nonNullable;
  private vetReportService = inject(VetReportService);
  filteredAnimalNames$!: Observable<string[]>;
  isLoading$ = signal(true);
  readonly panelOpenState$ = signal(false);

  employeeVetReportForm: FormGroup = this.fb.group({
    date: ['', [Validators.required]],
    food: ['', [Validators.required, Validators.maxLength(20)]],
    foodWeight: [undefined, [Validators.required]],
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
      this.employeeVetReportForm.patchValue({
        animalId: animal.id,
      });
    } else {
      console.error('Aucun animal trouvé avec ce nom');
    }
  }

  onBackButton() {
    this.isLoading$.set(true);
    this.employeeVetReportForm.reset();
  }

  onResetButton(stepper: MatStepper) {
    stepper.reset();
    this.employeeVetReportForm.reset();
    this.loadNameFilter();
  }

  createEmployeeVetReportByAnimalId() {
    this.isLoading$.set(true);

    if (!this.employeeVetReportForm.valid) {
      return;
    }

    this.vetReportService
      .createEmployeeVeReport(this.employeeVetReportForm.value)
      .subscribe({
        next: () => {
          this.isLoading$.set(false);
          this.reloadAnimals.emit();
        },
      });
  }
}
