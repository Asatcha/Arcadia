import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);
  private readonly snackBarDuration = 5000;

  createUser(user: User): Observable<User> {
    return this.http.post<User>('/user', user).pipe(
      tap(() => {
        this.snackBar.open('Compte créé avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error('Erreur lors de la création du compte :', err);
        this.snackBar.open('Échec de la création du compte.', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      })
    );
  }

  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/user').pipe(
      catchError((err) => {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
        return throwError(() => err);
      })
    );
  }

  findOneUserById(id: number): Observable<User> {
    return this.http.get<User>(`/user/${id}`).pipe(
      catchError((err) => {
        console.error(`Erreur lors de la récupération de l'utilisateur avec l'ID ${id} :`, err);
        return throwError(() => err);
      })
    );
  }
  
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`/user/${id}`, user).pipe(
      tap(() => {
        this.snackBar.open('Compte mis à jour avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error(`Erreur lors de la mise à jour de l'utilisateur avec l'ID ${id} :`, err);
        this.snackBar.open('Échec de la mise à jour du compte.', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      })
    );
  }

  deleteUserById(id: number): Observable<User> {
    return this.http.delete<User>(`/user/${id}`).pipe(
      tap(() => {
        this.snackBar.open('Compte supprimé avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${id} :`, err);
        this.snackBar.open('Échec de la suppression du compte.', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      })
    );
  }
}
