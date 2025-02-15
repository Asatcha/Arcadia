import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'arcadia-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder).nonNullable;
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);

  hide = signal(true);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    if (this.loginForm.invalid) {
      this.snackBar.open(
        'Veuillez remplir tous les champs correctement',
        'Fermer',
        { duration: 3000 }
      );
      return;
    }

    const formData = this.loginForm.value;

    this.http
      .post<{ token: string }>('/login', formData)
      .pipe(
        catchError((error) => {
          console.error('Erreur de connexion :', error);
          this.snackBar.open(
            'Échec de la connexion. Vérifiez vos identifiants.',
            'Fermer',
            { duration: 3000 }
          );
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          // localStorage.setItem('authToken', response.token);
          this.snackBar.open('Connexion réussie !', 'OK', { duration: 3000 });
          this.router.navigate(['/home']);
        }
      });
  }
}
