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
      catchError((err) => {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
        return throwError(() => err);
      })
    );
  }

  findOneHabitatById(id: number): Observable<Habitat> {
    return this.http.get<Habitat>(`/habitat/${id}`).pipe(
      catchError((err) => {
        console.error(
          `Erreur lors de la récupération de lhabitat avec l'ID ${id} :`,
          err
        );
        return throwError(() => err);
      })
    );
  }

  updateHabitatById(id: number, habitat: FormData): Observable<Habitat> {
    return this.http.patch<Habitat>(`/habitat/${id}`, habitat).pipe(
      tap(() => {
        this.snackBar.open('Habitat mis à jour avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error(
          `Erreur lors de la mise à jour de l'habitat avec l'ID ${id} :`,
          err
        );
        this.snackBar.open('Échec de la mise à jour de lhabitat.', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      })
    );
  }

  deleteHabitatById(habitatId: number): Observable<Habitat> {
    return this.http.delete<Habitat>(`/habitat/${habitatId}`).pipe(
      tap(() => {
        this.snackBar.open('Habitat supprimé avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error("Erreur lors de la suppression de l'habitat :", err);
        this.snackBar.open("Échec de la suppression de l'habitat.", 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      })
    );
  }
}
