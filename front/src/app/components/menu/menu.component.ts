import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'arcadia-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  menu = [
    { label: 'Accueil', link: '/home' },
    { label: 'Les services', link: '/service' },
    { label: 'Les habitats', link: '/habitat' },
    { label: 'Connexion', link: '/login' },
    { label: 'Contact', link: '/contact' },
  ];
}
