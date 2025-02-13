import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Habitat } from '../models/habitat.model';

@Injectable({
  providedIn: 'root',
})
export class HabitatService {
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);
  private readonly snackBarDuration = 5000;

  createHabitat(formData: FormData): Observable<Habitat> {
    return this.http.post<Habitat>('/habitat', formData).pipe(
      tap(() => {
        this.snackBar.open('Habitat créé avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error("Erreur lors de la création de l'habitat :", err);
        this.snackBar.open("Échec de la création de l'habitat.", 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      })
    );
  }

  findAllHabitats(): Observable<Habitat[]> {
    return this.http.get<Habitat[]>('/habitat').pipe(
      tap(() => {
        this.snackBar.open('Habitats chargés avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error('Erreur lors du chargement des habitats :', err);
        this.snackBar.open('Échec du chargement des habitats.', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      })
    );
  }
}
