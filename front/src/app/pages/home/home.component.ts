import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { RatingDialogComponent } from '../../components/rating-dialog/rating-dialog.component';
import { HabitatService } from '../../services/habitat.service';
import { Habitat } from '../../models/habitat.model';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/service.model';


@Component({
  selector: 'arcadia-home',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private habitatService = inject(HabitatService);
  habitats$ = signal<Habitat[]>([]);
  isLoadingHabitats$ = signal(true);
  private serviceService = inject(ServiceService);
  services$ = signal<Service[]>([]);
  isLoadingServices$ = signal(true);

  dialog = inject(MatDialog);

  ratings = [
    {
      stars: 5,
      name: 'Darius',
      comment:
        'Superbe ! Ce zoo est ombragé, agréable avec des enfants et intéressant',
    },
    {
      stars: 4,
      name: 'Pauline',
      comment:
        'Superbe ! Ce zoo est ombragé, agréable avec des enfants et intéressant',
    },
    {
      stars: 3,
      name: 'Nathalie',
      comment:
        'Superbe ! Ce zoo est ombragé, agréable avec des enfants et intéressant',
    },
  ];

  ngOnInit() {
    this.habitatService.findAllHabitats().subscribe({
      next: (habitats) => {
        this.habitats$.set(habitats);
        this.isLoadingHabitats$.set(false);
      },
    });

    this.serviceService.findAllServices().subscribe({
      next: (services) => {
        this.services$.set(services);
        this.isLoadingServices$.set(false);
      },
    });
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  openRatingDialog() {
    this.dialog.open(RatingDialogComponent);
  }
}
