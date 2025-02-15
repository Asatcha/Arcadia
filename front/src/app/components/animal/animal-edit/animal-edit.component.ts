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
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../models/animal.model';
import { map, Observable, startWith } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Habitat } from '../../../models/habitat.model';
import { Breed } from '../../../models/breed.model';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'arcadia-animal-edit',
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
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './animal-edit.component.html',
  styleUrl: './animal-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalEditComponent {
  private fb = inject(FormBuilder).nonNullable;
  private animalService = inject(AnimalService);
  animals = input.required<Animal[]>();
  animalNames = input.required<string[]>();
  habitats = input.required<Habitat[]>();
  habitatNames = input.required<string[]>();
  breeds = input.required<Breed[]>();
  breedNames = input.required<string[]>();
  reloadAnimals = output<void>();
  filteredAnimalNames$!: Observable<string[]>;
  isLoading$ = signal(true);
  readonly panelOpenState$ = signal(false);
  selectedFile!: File | null;

  editForm: FormGroup = this.fb.group({
    id: [0],
    name: ['', [Validators.required, Validators.maxLength(20)]],
    birthDate: ['', [Validators.required]],
    animalImage: [null, [Validators.required]],
    breedId: [null, [Validators.required]],
    habitatId: [null, [Validators.required]],
  });

  name = this.editForm.get('name') as FormControl<string>;

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
      name.toLocaleLowerCase().includes(filterValue)
    );
  }

  loadNameFilter() {
    this.filteredAnimalNames$ = this.name.valueChanges.pipe(
      startWith(''),
      map((name) => {
        return name ? this._filter(name) : this.animalNames().slice();
      })
    );
  }

  findAnimalByName(name: string) {
    const animal = this.animals().find(
      (animal) => animal.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (animal) {
      this.editForm.patchValue({
        ...animal,
        breedId: animal.breed.id,
        habitatId: animal.habitat.id,
      });
      console.log(this.editForm.value);
    } else {
      console.error('Aucun animal trouvé avec ce nom');
    }
  }

  onFileSelected(input: HTMLInputElement) {
    const image = input.files?.item(0);

    if (image) {
      this.selectedFile = image;
      this.editForm.patchValue({
        animalImage: image,
      });
    }
  }

  onBackButton() {
    this.isLoading$.set(true);
    this.editForm.reset();
  }

  onResetButton(stepper: MatStepper) {
    stepper.reset();
    this.editForm.reset();
    this.loadNameFilter();
  }

  updateAnimalById() {
    this.isLoading$.set(true);

    if (!this.editForm.valid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.editForm.value.name);
    formData.append('birthDate', this.editForm.value.birthDate);
    formData.append('breedId', this.editForm.value.breedId);
    formData.append('habitatId', this.editForm.value.habitatId);
    formData.append('animalImage', this.editForm.value.animalImage);

    this.animalService
      .updateAnimalById(this.editForm.value.id, formData)
      .subscribe({
        next: () => {
          this.isLoading$.set(false);
          this.reloadAnimals.emit();
          this.selectedFile = null;
        },
      });
  }
}
