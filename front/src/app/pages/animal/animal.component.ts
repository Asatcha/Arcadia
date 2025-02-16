import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'arcadia-animal',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalComponent {
  private router = inject(Router);
  private animalService = inject(AnimalService);
  animals$ = signal<Animal[]>([]);
  isLoadingAnimals$ = signal(true);

  ngOnInit() {
    this.animalService.findAllAnimals().subscribe({
      next: (animals) => {
        this.animals$.set(animals);
        this.isLoadingAnimals$.set(false);
      },
    });
  }
}
