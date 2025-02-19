import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);
  private readonly snackBarDuration = 5000;

  createService(formData: FormData): Observable<Service> {
    return this.http.post<Service>('/service', formData).pipe(
      tap(() => {
        this.snackBar.open('Service créé avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error('Erreur lors de la création du service :', err);
        this.snackBar.open('Échec de la création du service.', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      }),
    );
  }

  findAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>('/service').pipe(
      catchError((err) => {
        console.error('Erreur lors de la récupération des services :', err);
        return throwError(() => err);
      }),
    );
  }

  findServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`/service/${id}`).pipe(
      catchError((err) => {
        console.error(
          `Erreur lors de la récupération du service avec l'ID ${id} :`,
          err,
        );
        return throwError(() => err);
      }),
    );
  }

  updateServiceById(id: number, service: FormData): Observable<Service> {
    return this.http.patch<Service>(`/service/${id}`, service).pipe(
      tap(() => {
        this.snackBar.open('Service mis à jour avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error(
          `Erreur lors de la mise à jour du service avec l'ID ${id} :`,
          err,
        );
        this.snackBar.open("Échec de la mise à jour du service.", 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      }),
    );
  }

  deleteServiceById(serviceId: number): Observable<Service> {
    return this.http.delete<Service>(`/service/${serviceId}`).pipe(
      tap(() => {
        this.snackBar.open('Service supprimé avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error("Erreur lors de la suppression du service :", err);
        this.snackBar.open("Échec de la suppression du service.", 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      }),
    );
  }
}
