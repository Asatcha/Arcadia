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
import { FoodReportService } from '../../../services/food-report.service';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'arcadia-food-report-creation',
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
  templateUrl: './food-report-creation.component.html',
  styleUrl: './food-report-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodReportCreationComponent {
  animals = input.required<Animal[]>();
  animalNames = input.required<string[]>();
  reloadAnimals = output<void>();
  private fb = inject(FormBuilder).nonNullable;
  private foodReportService = inject(FoodReportService);
  filteredAnimalNames$!: Observable<string[]>;
  isLoading$ = signal(true);
  readonly panelOpenState$ = signal(false);

  foodReportForm: FormGroup = this.fb.group({
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
      this.foodReportForm.patchValue({
        animalId: animal.id,
      });
    } else {
      console.error('Aucun animal trouvé avec ce nom');
    }
  }

  onBackButton() {
    this.isLoading$.set(true);
    this.foodReportForm.reset();
  }

  onResetButton(stepper: MatStepper) {
    stepper.reset();
    this.foodReportForm.reset();
    this.loadNameFilter();
  }

  updateAnimalById() {
    this.isLoading$.set(true);

    if (!this.foodReportForm.valid) {
      return;
    }

    this.foodReportService
      .createFoodReport(this.foodReportForm.value)
      .subscribe({
        next: () => {
          this.isLoading$.set(false);
          this.reloadAnimals.emit();
        },
      });
  }
}
