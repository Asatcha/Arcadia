import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { User } from '../../models/user.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountCreationComponent } from '../../components/account/account-creation/account-creation.component';
import { AccountEditComponent } from '../../components/account/account-edit/account-edit.component';
import { AccountDeleteComponent } from '../../components/account/account-delete/account-delete.component';
import { UserService } from '../../services/user.service';
import { HabitatCreationComponent } from '../../components/habitat/habitat-creation/habitat-creation.component';
import { HabitatService } from '../../services/habitat.service';
import { Habitat } from '../../models/habitat.model';
import { HabitatDeleteComponent } from '../../components/habitat/habitat-delete/habitat-delete.component';
import { HabitatEditComponent } from "../../components/habitat/habitat-edit/habitat-edit.component";

@Component({
  selector: 'arcadia-admin',
  imports: [
    CommonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    AccountCreationComponent,
    AccountEditComponent,
    AccountDeleteComponent,
    HabitatCreationComponent,
    HabitatDeleteComponent,
    HabitatEditComponent
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  private userService = inject(UserService);
  private habitatService = inject(HabitatService);
  users$ = signal<User[]>([]);
  userEmails$ = signal<string[]>([]);
  habitats$ = signal<Habitat[]>([]);
  habitatNames$ = signal<string[]>([]);
  isLoadingUsers$ = signal(true);
  isLoadingHabitats$ = signal(true);

  ngOnInit() {
    this.loadAllUsers();
    this.loadAllHabitats();
  }

  loadAllUsers() {
    this.userService.findAllUsers().subscribe({
      next: (users) => {
        this.users$.set(users);
        this.userEmails$.set(users.map((user) => user.email));
        this.isLoadingUsers$.set(false);
      },
    });
  }

  loadAllHabitats() {
    this.habitatService.findAllHabitats().subscribe({
      next: (habitats) => {
        this.habitats$.set(habitats);
        this.habitatNames$.set(habitats.map((habitat) => habitat.name));
        this.isLoadingHabitats$.set(false);
      },
      error: (err) => {
        console.error('Erreur :', err);
      },
    });
  }
}
