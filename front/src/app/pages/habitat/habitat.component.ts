import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { HabitatService } from '../../services/habitat.service';
import { Habitat } from '../../models/habitat.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'arcadia-habitat',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './habitat.component.html',
  styleUrl: './habitat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HabitatComponent {
  private router = inject(Router);
  private habitatService = inject(HabitatService);
  habitats$ = signal<Habitat[]>([]);
  isLoadingHabitats$ = signal(true);

  habitats = [
    { label: 'Jungle', imageUrl: 'jungle.jpg' },
    { label: 'Savane', imageUrl: 'savane.jpg' },
    { label: 'Marais', imageUrl: 'marais.jpg' },
  ];

  ngOnInit() {
    this.habitatService.findAllHabitats().subscribe({
      next: (habitats) => {
        this.habitats$.set(habitats);
        this.isLoadingHabitats$.set(false);
      },
    });
  }
}
