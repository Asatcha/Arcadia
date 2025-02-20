import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VetReport } from '../models/vet-report.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { EmployeeVetReport } from '../models/employee-vet-report.model';

@Injectable({
  providedIn: 'root',
})
export class VetReportService {
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);
  private readonly snackBarDuration = 5000;

  createVetReport(vetReport: VetReport): Observable<VetReport> {
    return this.http.post<VetReport>('/vet-report', vetReport).pipe(
      tap(() => {
        this.snackBar.open('Rapport vétérinaire créé avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error(
          'Erreur lors de la création du rapport vétérinaire :',
          err,
        );
        this.snackBar.open(
          'Échec de la création du rapport vétérinaire.',
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

  createEmployeeVeReport(
    employeeVetReport: EmployeeVetReport,
  ): Observable<EmployeeVetReport> {
    return this.http
      .post<EmployeeVetReport>('/vet-report/employee', employeeVetReport)
      .pipe(
        tap(() => {
          this.snackBar.open(
            'Rapport vétérinaire créé avec succès !',
            'Fermer',
            {
              duration: this.snackBarDuration,
              panelClass: ['success-snackbar'],
            },
          );
        }),
        catchError((err) => {
          console.error(
            'Erreur lors de la création du rapport vétérinaire :',
            err,
          );
          this.snackBar.open(
            'Échec de la création du rapport vétérinaire.',
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

  updateVetReportById(vetReport: Partial<VetReport>): Observable<VetReport> {
    const id = vetReport.id;

    return this.http.patch<VetReport>(`/vet-report/${id}`, vetReport).pipe(
      tap(() => {
        this.snackBar.open('Rapport alimentaire mis à jour avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error(
          `Erreur lors de la mise à jour du rapport alimentaire avec l'ID ${id} :`,
          err,
        );
        this.snackBar.open('Échec de la mise à jour du rapport alimentaire.', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      }),
    );
  }

  deleteVetReportById(id: number): Observable<VetReport> {
    return this.http.delete<VetReport>(`/vet-report/${id}`).pipe(
      tap(() => {
        this.snackBar.open(
          'Rapport vétérinaire supprimé avec succès !',
          'Fermer',
          {
            duration: this.snackBarDuration,
            panelClass: ['success-snackbar'],
          },
        );
      }),
      catchError((err) => {
        console.error(
          `Erreur lors de la suppression du rapport vétérinaire avec l'ID ${id} :`,
          err,
        );
        this.snackBar.open(
          'Échec de la suppression du rapport vétérinaire.',
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
