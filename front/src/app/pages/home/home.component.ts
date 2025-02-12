import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { RatingDialogComponent } from '../../components/rating-dialog/rating-dialog.component';

@Component({
  selector: 'arcadia-home',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private router = inject(Router);
  dialog = inject(MatDialog);

  habitats = [
    { label: 'Jungle', imageUrl: 'jungle.jpg' },
    { label: 'Savane', imageUrl: 'savane.jpg' },
    { label: 'Marais', imageUrl: 'marais.jpg' },
  ];

  services = [
    { label: 'Restauration', description: 'blablabla', imageUrl: 'restaurant.jpg' },
    { label: 'Petit train', description: 'blablabla', imageUrl: 'train.png' },
    { label: 'Marais', description: 'blablabla', imageUrl: 'marais.jpg' },
  ];

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

  goTo(route: string) {
    this.router.navigate([route]);
  }

  openRatingDialog() {
    this.dialog.open(RatingDialogComponent);
  }
}
