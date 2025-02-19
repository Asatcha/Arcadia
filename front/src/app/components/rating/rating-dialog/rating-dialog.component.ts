import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { RatingService } from '../../../services/rating.service';

@Component({
  selector: 'arcadia-rating-dialog',
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    TextFieldModule,
  ],
  templateUrl: './rating-dialog.component.html',
  styleUrl: './rating-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingDialogComponent {
  reloadRatings = output<void>();

  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<RatingDialogComponent>);

  private fb = inject(FormBuilder).nonNullable;
  private _injector = inject(Injector);
  private ratingService = inject(RatingService);

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  ratingForm: FormGroup = this.fb.group({
    stars: [undefined, [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(20)]],
    comment: ['', [Validators.required, Validators.maxLength(200)]],
  });

  triggerResize() {
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      },
    );
  }

  submit() {
    if (!this.ratingForm.valid) {
      return;
    }

    this.ratingService.createRating(this.ratingForm.value).subscribe({
      next: () => {
        this.ratingForm.reset();
        this.dialogRef.close();
        this.reloadRatings.emit();
      },
    });
  }

  setRating(star: number) {
    this.ratingForm.patchValue({
      stars: star,
    });
  }
}
