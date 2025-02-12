import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountCreationComponent } from '../../components/admin/account-creation/account-creation.component';
import { AccountEditComponent } from '../../components/admin/account-edit/account-edit.component';
import { AdminService } from './admin.service';
import { User } from '../../shared/user.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'arcadia-admin',
  imports: [
    CommonModule,
    MatTabsModule,
    AccountCreationComponent,
    AccountEditComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  private adminService = inject(AdminService);
  users$ = signal<User[]>([]);
  userEmails$ = signal<string[]>([]);
  isLoading$ = signal(true);

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.adminService.findAllUsers().subscribe({
      next: (users) => {
        this.users$.set(users);
        this.userEmails$.set(users.map((user) => user.email));
        this.isLoading$.set(false);
      },
      error: (err) => {
        console.error('Erreur :', err);
      },
    });
  }
}
