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
import { ServiceService } from '../../../services/service.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'arcadia-service-creation',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  templateUrl: './service-creation.component.html',
  styleUrl: './service-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCreationComponent {
  reloadServices = output<void>();
  private fb = inject(FormBuilder).nonNullable;
  private serviceService = inject(ServiceService);
  readonly panelOpenState = signal(false);
  private _injector = inject(Injector);
  selectedFile!: File | null;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  serviceForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    serviceImage: [null, [Validators.required]],
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

  onFileSelected(input: HTMLInputElement) {
    const image = input.files?.item(0);

    if (image) {
      this.selectedFile = image;
      this.serviceForm.patchValue({
        serviceImage: image,
      });
    }
  }

  submit() {
    if (!this.serviceForm.valid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.serviceForm.value.name);
    formData.append('description', this.serviceForm.value.description);
    formData.append('serviceImage', this.serviceForm.value.serviceImage);

    this.serviceService.createService(formData).subscribe({
      next: () => {
        this.reloadServices.emit();
        this.serviceForm.reset();
      },
    });

    this.selectedFile = null;
  }
}
