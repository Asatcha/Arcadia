import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from '../models/contact.model';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);
  private readonly snackBarDuration = 5000;

  sendContactEmail(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>('/contact/send', contact).pipe(
      tap((response) => {
        this.snackBar.open(response.message, 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['success-snackbar'],
        });
      }),
      catchError((err) => {
        console.error("Erreur lors de l'envoi du message :", err);
        this.snackBar.open("Échec de l'envoi du message.", 'Fermer', {
          duration: this.snackBarDuration,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => err); // Rejeter l'erreur pour la gestion globale
      }),
    );
  }
}
