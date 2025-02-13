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
import { AdminService } from '../../services/admin.service';
import { HabitatCreationComponent } from '../../components/habitat/habitat-creation/habitat-creation.component';

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
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  private adminService = inject(AdminService);
  users$ = signal<User[]>([]);
  userEmails$ = signal<string[]>([]);
  isLoadingUsers$ = signal(true);
  isLoadingHabitats$ = signal(false);

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.adminService.findAllUsers().subscribe({
      next: (users) => {
        this.users$.set(users);
        this.userEmails$.set(users.map((user) => user.email));
        this.isLoadingUsers$.set(false);
      },
      error: (err) => {
        console.error('Erreur :', err);
      },
    });
  }
}
