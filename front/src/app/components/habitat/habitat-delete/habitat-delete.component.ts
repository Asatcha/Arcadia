import { AsyncPipe, CommonModule } from '@angular/common';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, startWith } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HabitatService } from '../../../services/habitat.service';
import { Habitat } from '../../../models/habitat.model';

@Component({
  selector: 'arcadia-habitat-delete',
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
  templateUrl: './habitat-delete.component.html',
  styleUrl: './habitat-delete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HabitatDeleteComponent implements OnInit, OnChanges {
  habitats = input.required<Habitat[]>();
  habitatNames = input.required<string[]>();
  reloadHabitats = output<void>();
  private fb = inject(FormBuilder).nonNullable;
  private habitatService = inject(HabitatService);
  filteredHabitatNames$!: Observable<string[]>;
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
    if (changes['habitats'] || changes['habitatNames']) {
      this.loadNameFilter();
    }
  }

  loadNameFilter() {
    this.filteredHabitatNames$ = this.name.valueChanges.pipe(
      startWith(''),
      map((name) => {
        return name ? this._filter(name) : this.habitatNames().slice();
      }),
    );
  }

  displayFn(name: string): string {
    return name;
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLocaleLowerCase();

    return this.habitatNames().filter((name) =>
      name.toLocaleLowerCase().includes(filterValue),
    );
  }

  onSubmit() {
    const nameValue = this.deleteForm.value.name;

    if (!nameValue) {
      console.error('Aucun nom saisi !');
      return;
    }

    const habitat = this.habitats().find(
      (habitat) =>
        habitat.name.toLocaleLowerCase() === nameValue.toLocaleLowerCase(),
    );

    if (!habitat) {
      console.error('Aucun utilisateur trouvé avec cet email !');
      return;
    }

    this.deleteForm.patchValue({ id: habitat.id });

    this.habitatService.deleteHabitatById(habitat.id).subscribe({
      next: () => {
        this.deleteForm.reset();
        this.reloadHabitats.emit();
      },
    });
  }
}
