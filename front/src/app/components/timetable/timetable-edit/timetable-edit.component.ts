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
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSelectModule } from '@angular/material/select';
import { TimetableService } from '../../../services/timetable.service';
import { Timetable } from '../../../models/timetable.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'arcadia-timetable-edit',
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
    MatSelectModule,
    MatCheckboxModule,
    MatTimepickerModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './timetable-edit.component.html',
  styleUrl: './timetable-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimetableEditComponent {
  timetables = input.required<Timetable[]>();
  timetableDays = input.required<string[]>();
  private fb = inject(FormBuilder).nonNullable;
  private timetableService = inject(TimetableService);
  reloadTimetables = output<void>();
  filteredTimetableDays$!: Observable<string[]>;
  isLoading$ = signal(true);
  readonly panelOpenState$ = signal(false);

  editForm = this.fb.group({
    id: [0],
    dayOfWeek: ['', [Validators.required]],
    openingTime: ['', [Validators.required]],
    closingTime: ['', [Validators.required]],
    isClosed: [false, [Validators.required]],
  });

  dayOfWeek = this.editForm.get('dayOfWeek') as FormControl<string>;

  ngOnInit() {
    this.loadTimetableDayFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['timetables'] || changes['timetableDays']) {
      this.loadTimetableDayFilter();
    }
  }

  displayFn(day: string): string {
    return day;
  }

  private _filter(day: string): string[] {
    const filterValue = day.toLocaleLowerCase();

    return this.timetableDays().filter((timetableDay) =>
      timetableDay.toLocaleLowerCase().includes(filterValue),
    );
  }

  loadTimetableDayFilter() {
    this.filteredTimetableDays$ = this.editForm
      .get('dayOfWeek')!
      .valueChanges.pipe(
        startWith(''),
        map((day) => {
          return day ? this._filter(day) : this.timetableDays().slice();
        }),
      );
  }

  findTimetableByDay(dayOfWeek: string) {
    const timetable = this.timetables().find(
      (timetable) =>
        timetable.dayOfWeek.toLocaleLowerCase() ===
        dayOfWeek.toLocaleLowerCase(),
    );

    if (timetable) {
      this.editForm.patchValue({
        ...timetable,
        openingTime: this.convertTimeToDateTime(
          timetable.openingTime,
        ).toISOString(),
        closingTime: this.convertTimeToDateTime(
          timetable.closingTime,
        ).toISOString(),
      });
    } else {
      console.error('Aucun horaire trouvé pour ce jour');
    }
  }

  /**
   * Convertit une chaîne de temps (hh:mm:ss) en objet Date.
   */
  private convertTimeToDateTime(timeString: string): Date {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
  }

  onBackButton() {
    this.isLoading$.set(true);
    this.editForm.reset();
  }

  onResetButton(stepper: MatStepper) {
    stepper.reset();
    this.editForm.reset();
  }

  updateTimetableById() {
    this.isLoading$.set(true);

    const formData = this.editForm.value;
    const timetableId = formData.id;

    if (!timetableId) {
      console.error('Impossible de mettre à jour : ID horaire manquant');
      this.isLoading$.set(false);
      return;
    }

    const formatTime = (dateTime?: string): string | undefined => {
      if (!dateTime) return undefined;

      const date = new Date(dateTime);
      if (isNaN(date.getTime())) return dateTime;

      return date.toLocaleTimeString('fr-FR', { hour12: false });
    };

    const updatedTimetable: Partial<Timetable> = {
      id: formData.id,
      dayOfWeek: formData.dayOfWeek,
      openingTime: formatTime(formData.openingTime),
      closingTime: formatTime(formData.closingTime),
      isClosed: formData.isClosed,
    };

    this.timetableService.updateTimetableById(updatedTimetable).subscribe({
      next: () => {
        this.isLoading$.set(false);
        this.reloadTimetables.emit();
      },
    });
  }
}
