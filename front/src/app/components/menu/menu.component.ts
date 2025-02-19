import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'arcadia-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoggedIn$ = this.authService.isLoggedIn$;

  menu = [
    { label: 'Accueil', link: '/home' },
    { label: 'Les services', link: '/service' },
    { label: 'Les habitats', link: '/habitat' },
    { label: 'Contact', link: '/contact' },
  ];

  get authButtonLabel() {
    return this.isLoggedIn$() ? 'Déconnexion' : 'Connexion';
  }

  handleAuthAction() {
    if (this.isLoggedIn$()) {
      this.authService.logout();
    } else {
      this.router.navigate(['/login']);
    }
  }
}
