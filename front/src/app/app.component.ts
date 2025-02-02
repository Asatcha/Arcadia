import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'arcadia-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}
