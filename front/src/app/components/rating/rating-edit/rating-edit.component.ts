import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Rating } from '../../../models/rating.model';
import { RatingService } from '../../../services/rating.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'arcadia-rating-edit',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './rating-edit.component.html',
  styleUrl: './rating-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingEditComponent {
  ratings = input.required<Rating[]>();
  reloadRatings = output<void>();
  private ratingService = inject(RatingService);

  validateRating(id: number) {
    const rating: Partial<Rating> = {
      id: id,
      isValid: true,
    };
    this.ratingService.updateRatingById(rating).subscribe({
      next: () => {
        this.reloadRatings.emit();
      },
    });
  }

  deleteRating(id: number) {
    this.ratingService.deleteRatingById(id).subscribe({
      next: () => {
        this.reloadRatings.emit();
      },
    });
  }
}
