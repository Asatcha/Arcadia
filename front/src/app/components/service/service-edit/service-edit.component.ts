import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  OnInit,
  signal,
  SimpleChanges,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { Service } from '../../../models/service.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../../../services/service.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { map, Observable, startWith } from 'rxjs';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'arcadia-service-edit',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  templateUrl: './service-edit.component.html',
  styleUrl: './service-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceEditComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder).nonNullable;
  private serviceService = inject(ServiceService);
  services = input.required<Service[]>();
  serviceNames = input.required<string[]>();
  reloadServices = output<void>();
  filteredServiceNames$!: Observable<string[]>;
  isLoading$ = signal(true);
  readonly panelOpenState$ = signal(false);
  selectedFile!: File | null;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  editForm: FormGroup = this.fb.group({
    id: [0],
    name: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    serviceImage: [null],
  });

  name = this.editForm.get('name') as FormControl<string>;

  ngOnInit() {
    this.loadNameFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['services'] || changes['serviceNames']) {
      this.loadNameFilter();
    }
  }

  displayFn(name: string): string {
    return name;
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLocaleLowerCase();

    return this.serviceNames().filter((name) =>
      name.toLocaleLowerCase().includes(filterValue),
    );
  }

  loadNameFilter() {
    this.filteredServiceNames$ = this.editForm.get('name')!.valueChanges.pipe(
      startWith(''),
      map((name) => {
        return name ? this._filter(name) : this.serviceNames().slice();
      }),
    );
  }

  findServiceByName(name: string) {
    const service = this.services().find(
      (service) =>
        service.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );

    if (service) {
      this.editForm.patchValue({
        ...service,
      });
    } else {
      console.error('Aucun service trouvé avec ce nom');
    }
  }

  onFileSelected(input: HTMLInputElement) {
    const image = input.files?.item(0);

    if (image) {
      this.selectedFile = image;
      this.editForm.patchValue({
        serviceImage: image,
      });
    }
  }

  onBackButton() {
    this.isLoading$.set(true);
    this.editForm.reset();
  }

  onResetButton(stepper: MatStepper) {
    stepper.reset();
    this.editForm.reset();
    this.loadNameFilter();
  }

  updateServiceById() {
    this.isLoading$.set(true);

    if (!this.editForm.valid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.editForm.value.name);
    formData.append('description', this.editForm.value.description);
    formData.append('serviceImage', this.editForm.value.serviceImage);

    this.serviceService
      .updateServiceById(this.editForm.value.id, formData)
      .subscribe({
        next: () => {
          this.isLoading$.set(false);
          this.reloadServices.emit();
          this.selectedFile = null;
        },
      });
  }
}
