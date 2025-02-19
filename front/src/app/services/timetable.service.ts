import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Timetable } from '../models/timetable.model';

@Injectable({
  providedIn: 'root',
})
export class TimetableService {
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);
  private readonly snackBarDuration = 5000;

  findAllTimetables(): Observable<Timetable[]> {
    return this.http.get<Timetable[]>('/timetable').pipe(
      catchError((err) => {
        console.error('Erreur lors de la récupération des horaires :', err);
        return throwError(() => err);
      }),
    );
  }

  updateTimetableById(timetable: Partial<Timetable>): Observable<Timetable> {
    const id = timetable.id;

    return this.http.patch<Timetable>(`/timetable/${id}`, timetable).pipe(
      tap(() => {
        this.snackBar.open('Horaire mis à jour avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error(
          `Erreur lors de la mise à jour de l'horaire avec l'ID ${id} :`,
          err,
        );
        this.snackBar.open("Échec de la mise à jour de l'horaire.", 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      }),
    );
  }
}
