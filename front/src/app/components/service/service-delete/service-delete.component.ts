import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../../../services/service.service';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Service } from '../../../models/service.model';

@Component({
  selector: 'arcadia-service-delete',
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './service-delete.component.html',
  styleUrl: './service-delete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDeleteComponent implements OnInit, OnChanges {
  services = input.required<Service[]>();
  serviceNames = input.required<string[]>();
  reloadServices = output<void>();
  private fb = inject(FormBuilder).nonNullable;
  private serviceService = inject(ServiceService);
  filteredServiceNames$!: Observable<string[]>;
  readonly panelOpenState = signal(false);

  deleteForm: FormGroup = this.fb.group({
    id: [0],
    name: ['', [Validators.required]],
  });

  name = this.deleteForm.get('name') as FormControl<string>;

  ngOnInit() {
    this.loadNameFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['services'] || changes['serviceNames']) {
      this.loadNameFilter();
    }
  }

  loadNameFilter() {
    this.filteredServiceNames$ = this.name.valueChanges.pipe(
      startWith(''),
      map((name) => {
        return name ? this._filter(name) : this.serviceNames().slice();
      }),
    );
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

  onSubmit() {
    const nameValue = this.deleteForm.value.name;

    if (!nameValue) {
      console.error('Aucun nom saisi !');
      return;
    }

    const service = this.services().find(
      (service) =>
        service.name.toLocaleLowerCase() === nameValue.toLocaleLowerCase(),
    );

    if (!service) {
      console.error('Aucun service trouvé avec ce nom !');
      return;
    }

    this.deleteForm.patchValue({ id: service.id });

    this.serviceService.deleteServiceById(service.id).subscribe({
      next: () => {
        this.deleteForm.reset();
        this.reloadServices.emit();
      },
    });
  }
}
