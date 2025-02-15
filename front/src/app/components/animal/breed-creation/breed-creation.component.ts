import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
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
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { AnimalService } from '../../../services/animal.service';
import { Breed } from '../../../models/breed.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'arcadia-breed-creation',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
  ],
  templateUrl: './breed-creation.component.html',
  styleUrl: './breed-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreedCreationComponent {
  breeds = input.required<Breed[]>();
  breedNames = input.required<string[]>();
  reloadBreeds = output<void>();
  private fb = inject(FormBuilder).nonNullable;
  private animalService = inject(AnimalService);
  filteredBreedNames$!: Observable<string[]>;
  readonly panelOpenState = signal(false);

  breedForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
  });

  submit() {
    this.animalService.createBreed(this.breedForm.value).subscribe({
      next: () => {
        this.breedForm.reset();
        this.reloadBreeds.emit();
      },
    });
  }
}
