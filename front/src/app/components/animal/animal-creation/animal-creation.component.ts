import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AnimalService } from '../../../services/animal.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { Habitat } from '../../../models/habitat.model';
import { Breed } from '../../../models/breed.model';

@Component({
  selector: 'arcadia-animal-creation',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './animal-creation.component.html',
  styleUrl: './animal-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalCreationComponent {
  habitats = input.required<Habitat[]>();
  habitatNames = input.required<string[]>();
  breeds = input.required<Breed[]>();
  breedNames = input.required<string[]>();
  reloadAnimals = output<void>();
  private fb = inject(FormBuilder).nonNullable;
  private animalService = inject(AnimalService);
  readonly panelOpenState = signal(false);
  selectedFile!: File | null;

  animalForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    birthDate: ['', [Validators.required]],
    animalImage: [null, [Validators.required]],
    breedId: [null, [Validators.required]],
    habitatId: [null, [Validators.required]],
  });

  onFileSelected(input: HTMLInputElement) {
    const image = input.files?.item(0);

    if (image) {
      this.selectedFile = image;
      this.animalForm.patchValue({
        animalImage: image,
      });
    }
  }

  submit() {
    if (!this.animalForm.valid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.animalForm.value.name);
    formData.append('birthDate', this.animalForm.value.birthDate);
    formData.append('breedId', this.animalForm.value.breedId);
    formData.append('habitatId', this.animalForm.value.habitatId);
    formData.append('animalImage', this.animalForm.value.animalImage);

    this.animalService.createAnimal(formData).subscribe({
      next: () => {
        this.animalForm.reset();
        this.reloadAnimals.emit();
      },
    });

    this.selectedFile = null;
  }
}
