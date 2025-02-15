import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Animal } from '../../../models/animal.model';
import { AnimalService } from '../../../services/animal.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'arcadia-animal-delete',
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
  templateUrl: './animal-delete.component.html',
  styleUrl: './animal-delete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalDeleteComponent {
  animals = input.required<Animal[]>();
  animalNames = input.required<string[]>();
  reloadAnimals = output<void>();
  private fb = inject(FormBuilder).nonNullable;
  private animalService = inject(AnimalService);
  filteredAnimalNames$!: Observable<string[]>;
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
    if (changes['animals'] || changes['animalNames']) {
      this.loadNameFilter();
    }
  }

  loadNameFilter() {
    this.filteredAnimalNames$ = this.name.valueChanges.pipe(
      startWith(''),
      map((name) => {
        return name ? this._filter(name) : this.animalNames().slice();
      }),
    );
  }

  displayFn(name: string): string {
    return name;
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLocaleLowerCase();

    return this.animalNames().filter((name) =>
      name.toLocaleLowerCase().includes(filterValue),
    );
  }

  onSubmit() {
    const nameValue = this.deleteForm.value.name;

    if (!nameValue) {
      console.error('Aucun nom saisi !');
      return;
    }

    const animal = this.animals().find(
      (animal) =>
        animal.name.toLocaleLowerCase() === nameValue.toLocaleLowerCase(),
    );

    if (!animal) {
      console.error('Aucun animal trouvé avec ce nom !');
      return;
    }

    this.deleteForm.patchValue({ id: animal.id });

    this.animalService.deleteAnimalById(animal.id).subscribe({
      next: () => {
        this.deleteForm.reset();
        this.reloadAnimals.emit();
      },
    });
  }
}
