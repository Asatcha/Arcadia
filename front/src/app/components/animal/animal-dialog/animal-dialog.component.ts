import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
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
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'arcadia-animal-dialog',
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
  templateUrl: './animal-dialog.component.html',
  styleUrl: './animal-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder).nonNullable;
  private _injector = inject(Injector);


  ratingForm: FormGroup = this.fb.group({
    stars: [undefined, [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(20)]],
    comment: ['', [Validators.required, Validators.maxLength(200)]],
  });

  // triggerResize() {
  //   afterNextRender(
  //     () => {
  //       this.autosize.resizeToFitContent(true);
  //     },
  //     {
  //       injector: this._injector,
  //     },
  //   );
  // }

  submit() {
    console.log(this.ratingForm.value);
    // if (this.ratingForm.valid) {
    //   this.data.close(this.ratingForm.value);
    // }
  }

  setRating(star: number): void {
    this.ratingForm.patchValue({
      stars: star,
    });
  }
}
