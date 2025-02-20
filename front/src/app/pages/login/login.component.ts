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
import { AuthService } from '../../services/auth.service';

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
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder).nonNullable;
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

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
        {
          duration: 3000,
        },
      );
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Connexion réussie !', 'OK', { duration: 3000 });

          const userRole = this.authService.getUserRole();

          switch (userRole) {
            case 'isAdmin':
              this.router.navigate(['/admin']);
              break;
            case 'isEmployee':
              this.router.navigate(['/employee']);
              break;
            case 'isVet':
              this.router.navigate(['/vet']);
              break;
            default:
              this.router.navigate(['/home']);
              break;
          }
        }
      },
      error: (err) => {
        console.error('Erreur lors de la connexion :', err);
        this.snackBar.open('Échec de la connexion.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
