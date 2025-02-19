import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { FoodReport } from '../models/food-report.model';

@Injectable({
  providedIn: 'root',
})
export class FoodReportService {
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);
  private readonly snackBarDuration = 5000;

  createFoodReport(foodReport: FoodReport): Observable<FoodReport> {
    return this.http.post<FoodReport>('/food-report', foodReport).pipe(
      tap(() => {
        this.snackBar.open('Rapport alimentaire créé avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error(
          'Erreur lors de la création du rapport alimentaire :',
          err,
        );
        this.snackBar.open(
          'Échec de la création du rapport alimentaire.',
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

  findOneFoodReportById(id: number): Observable<FoodReport> {
    return this.http.get<FoodReport>(`/food-report/${id}`).pipe(
      catchError((err) => {
        console.error(
          `Erreur lors de la récupération du rapport alimentaire avec l'ID ${id} :`,
          err,
        );
        return throwError(() => err);
      }),
    );
  }

  deleteFoodReportById(id: number): Observable<FoodReport> {
    return this.http.delete<FoodReport>(`/food-report/${id}`).pipe(
      tap(() => {
        this.snackBar.open(
          'Rapport alimentaire supprimé avec succès !',
          'Fermer',
          {
            duration: this.snackBarDuration,
            panelClass: ['success-snackbar'],
          },
        );
      }),
      catchError((err) => {
        console.error(
          `Erreur lors de la suppression de l'utilisateur avec l'ID ${id} :`,
          err,
        );
        this.snackBar.open(
          'Échec de la suppression du rapport alimentaire.',
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
}
