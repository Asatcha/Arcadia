import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
import { MatRadioModule } from '@angular/material/radio';
import { AnimalService } from '../../../services/animal.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'arcadia-animal-creation',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatExpansionModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './animal-creation.component.html',
  styleUrl: './animal-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalCreationComponent {
  reloadAnimals = output<void>();
  private fb = inject(FormBuilder).nonNullable;
  private animalService = inject(AnimalService);
  readonly panelOpenState = signal(false);

  animalForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    birthDate: ['', [Validators.required, Validators.email]],
    animalImage: [undefined, [Validators.required, Validators.minLength(8)]],
    breedId: [0, [Validators.required, Validators.minLength(8)]],
  });

  breed = [];

  submit() {}
}
