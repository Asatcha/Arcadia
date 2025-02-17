import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Animal } from '../../../models/animal.model';
import { AgePipe } from '../../../pipes/age-pipe.pipe';

@Component({
  selector: 'arcadia-animal-dialog',
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule,
    MatButtonModule,
    AgePipe,
  ],
  templateUrl: './animal-dialog.component.html',
  styleUrl: './animal-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalDialogComponent {
  animal: Animal = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<AnimalDialogComponent>);

  ngOnInit() {
    console.log(this.animal);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
