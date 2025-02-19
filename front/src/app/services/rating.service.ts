import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Rating } from '../models/rating.model';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);
  private readonly snackBarDuration = 5000;

  createRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>('/rating', rating).pipe(
      tap(() => {
        this.snackBar.open('Avis créé avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error("Erreur lors de la création de l'avis :", err);
        this.snackBar.open("Échec de la création de l'avis.", 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      }),
    );
  }

  findAllRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>('/rating').pipe(
      catchError((err) => {
        console.error('Erreur lors de la récupération des avis :', err);
        return throwError(() => err);
      }),
    );
  }

  findAllRatingsToValidate(): Observable<Rating[]> {
    return this.http.get<Rating[]>('/rating/to-validate').pipe(
      catchError((err) => {
        console.error(
          'Erreur lors de la récupération des avis à valider :',
          err,
        );
        return throwError(() => err);
      }),
    );
  }

  updateRatingById(rating: Partial<Rating>): Observable<Rating> {
    const id = rating.id;

    return this.http.patch<Rating>(`/rating/${id}`, rating).pipe(
      tap(() => {
        this.snackBar.open('Avis validé avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error(
          `Erreur lors de la validation de l'avis avec l'ID ${id} :`,
          err,
        );
        this.snackBar.open(
          "Échec de la mise à jour de la validation de l'avis.",
          'Fermer',
          {
            duration: this.snackBarDuration,
            panelClass: ['error-snackbar'],
          },
        );
        return throwError(() => err);
      }),
    );
  }

  deleteRatingById(id: number): Observable<Rating> {
    return this.http.delete<Rating>(`/rating/${id}`).pipe(
      tap(() => {
        this.snackBar.open('Avis supprimé avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error(
          `Erreur lors de la suppression de l'avis avec l'ID ${id} :`,
          err,
        );
        this.snackBar.open("Échec de la suppression de l'avis.", 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      }),
    );
  }
}
