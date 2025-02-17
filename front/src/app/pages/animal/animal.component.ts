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
import { ActivatedRoute, Router } from '@angular/router';
import { HabitatService } from '../../services/habitat.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AnimalDialogComponent } from '../../components/animal/animal-dialog/animal-dialog.component';

@Component({
  selector: 'arcadia-animal',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private animalService = inject(AnimalService);
  private habitatService = inject(HabitatService);

  dialog = inject(MatDialog);

  animals$ = signal<Animal[]>([]);
  habitatName$ = signal<string>('Les animaux');
  isLoadingAnimals$ = signal(true);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const habitatId = params['habitatId'];
      if (habitatId) {
        this.loadHabitat(habitatId);
      } else {
        this.loadAllAnimals();
      }
    });
  }

  loadAllAnimals() {
    this.animalService.findAllAnimals().subscribe((animals) => {
      this.animals$.set(animals);
      this.isLoadingAnimals$.set(false);
    });
  }

  loadHabitat(habitatId: number) {
    this.habitatService.findHabitatById(habitatId).subscribe((habitat) => {
      if (!habitat) {
        this.router.navigate(['/animal']);
      } else {
        this.habitatName$.set(`Les animaux de l'habitat : ${habitat.name}`);
        this.loadAnimalsByHabitat(habitatId);
      }
    });
  }

  loadAnimalsByHabitat(habitatId: number) {
    this.animalService.findAnimalsByHabitat(habitatId).subscribe((animals) => {
      this.animals$.set(animals);
      this.isLoadingAnimals$.set(false);
    });
  }

  openAnimalDetails(animal: Animal) {
    this.dialog.open(AnimalDialogComponent, { data: animal });
  }
}
