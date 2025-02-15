import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  output,
  signal,
  ViewChild,
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
import { HabitatService } from '../../../services/habitat.service';

@Component({
  selector: 'arcadia-habitat-creation',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    TextFieldModule,
  ],
  templateUrl: './habitat-creation.component.html',
  styleUrl: './habitat-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HabitatCreationComponent {
  reloadHabitats = output<void>();
  private fb = inject(FormBuilder).nonNullable;
  private habitatService = inject(HabitatService);
  readonly panelOpenState = signal(false);
  private _injector = inject(Injector);
  selectedFile!: File | null;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  habitatForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    comments: ['', [Validators.maxLength(1000)]],
    habitatImage: [null, [Validators.required]],
  });

  breed = [];

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

  onFileSelected(input: HTMLInputElement) {
    const image = input.files?.item(0);

    if (image) {
      this.selectedFile = image;
      this.habitatForm.patchValue({
        habitatImage: image,
      });
    }
  }

  submit() {
    if (!this.habitatForm.valid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.habitatForm.value.name);
    formData.append('description', this.habitatForm.value.description);
    formData.append('comments', this.habitatForm.value.comments);
    formData.append('habitatImage', this.habitatForm.value.habitatImage);

    this.habitatService.createHabitat(formData).subscribe({
      next: () => {
        this.reloadHabitats.emit();
        this.habitatForm.reset();
      },
    });

    this.selectedFile = null;
  }
}
