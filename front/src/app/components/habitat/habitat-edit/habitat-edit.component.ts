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
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UserService } from '../../../services/user.service';
import { Habitat } from '../../../models/habitat.model';
import { HabitatService } from '../../../services/habitat.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'arcadia-habitat-edit',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
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
  templateUrl: './habitat-edit.component.html',
  styleUrl: './habitat-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HabitatEditComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder).nonNullable;
  private userService = inject(UserService);
  private habitatService = inject(HabitatService);
  habitats = input.required<Habitat[]>();
  habitatNames = input.required<string[]>();
  reloadHabitats = output<void>();
  filteredHabitatNames$!: Observable<string[]>;
  isLoading$ = signal(true);
  readonly panelOpenState$ = signal(false);
  selectedFile!: File | null;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  editForm: FormGroup = this.fb.group({
    id: [0],
    name: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    comments: ['', [Validators.maxLength(1000)]],
    habitatImage: [null],
  });

  name = this.editForm.get('name') as FormControl<string>;

  ngOnInit() {
    this.loadNameFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['habitats'] || changes['habitatNames']) {
      this.loadNameFilter();
    }
  }

  displayFn(name: string): string {
    return name;
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLocaleLowerCase();

    return this.habitatNames().filter((name) =>
      name.toLocaleLowerCase().includes(filterValue)
    );
  }

  loadNameFilter() {
    this.filteredHabitatNames$ = this.editForm.get('name')!.valueChanges.pipe(
      startWith(''),
      map((name) => {
        return name ? this._filter(name) : this.habitatNames().slice();
      })
    );
  }

  findHabitatByName(name: string) {
    const habitat = this.habitats().find(
      (habitat) => habitat.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (habitat) {
      this.editForm.patchValue({
        id: habitat.id,
        name: habitat.name,
        description: habitat.description,
        comments: habitat.comments,
      });
    } else {
      console.error('Aucun habitat trouvé avec ce nom');
    }
  }

  onFileSelected(input: HTMLInputElement) {
    const image = input.files?.item(0);

    if (image) {
      this.selectedFile = image;
      this.editForm.patchValue({
        habitatImage: image,
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

  updateHabitatById() {
    this.isLoading$.set(true);

    if (!this.editForm.valid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.editForm.value.name);
    formData.append('description', this.editForm.value.description);
    formData.append('comments', this.editForm.value.comments);
    formData.append('habitatImage', this.editForm.value.habitatImage);

    this.habitatService
      .updateHabitatById(this.editForm.value.id, formData)
      .subscribe({
        next: () => {
          this.isLoading$.set(false);
          this.reloadHabitats.emit();
          this.selectedFile = null;
        },
      });
  }
}
