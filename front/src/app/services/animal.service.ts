import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Animal } from '../models/animal.model';
import { Breed } from '../models/breed.model';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);
  private readonly snackBarDuration = 5000;

  createAnimal(formData: FormData): Observable<Animal> {
    return this.http.post<Animal>('/animal', formData).pipe(
      tap(() => {
        this.snackBar.open('Animal créé avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error("Erreur lors de la création de l'animal :", err);
        this.snackBar.open("Échec de la création de l'animal.", 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      })
    );
  }

  findAllAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>('/animal').pipe(
      catchError((err) => {
        console.error('Erreur lors de la récupération des animaux :', err);
        return throwError(() => err);
      })
    );
  }

  findOneAnimalById(id: number): Observable<Animal> {
    return this.http.get<Animal>(`/animal/${id}`).pipe(
      catchError((err) => {
        console.error(
          `Erreur lors de la récupération de lanimal avec l'ID ${id} :`,
          err
        );
        return throwError(() => err);
      })
    );
  }

  updateAnimalById(id: number, animal: FormData): Observable<Animal> {
    return this.http.patch<Animal>(`/animal/${id}`, animal).pipe(
      tap(() => {
        this.snackBar.open('Animal mis à jour avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error(
          `Erreur lors de la mise à jour de l'animal avec l'ID ${id} :`,
          err
        );
        this.snackBar.open('Échec de la mise à jour de lanimal.', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      })
    );
  }

  deleteAnimalById(animalId: number): Observable<Animal> {
    return this.http.delete<Animal>(`/animal/${animalId}`).pipe(
      tap(() => {
        this.snackBar.open('Animal supprimé avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error("Erreur lors de la suppression de l'animal :", err);
        this.snackBar.open("Échec de la suppression de l'animal.", 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      })
    );
  }

  createBreed(breed: Breed): Observable<Breed> {
    return this.http.post<Breed>('/breed', breed).pipe(
      tap(() => {
        this.snackBar.open('Race créée avec succès !', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error('Erreur lors de la création de la race :', err);
        this.snackBar.open('Échec de la création de la race.', 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err);
      })
    );
  }

  findAllBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>('/breed').pipe(
      catchError((err) => {
        console.error('Erreur lors de la récupération des races :', err);
        return throwError(() => err);
      })
    );
  }
}
