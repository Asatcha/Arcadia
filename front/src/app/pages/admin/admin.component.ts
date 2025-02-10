import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountCreationComponent } from '../../components/admin/account-creation/account-creation.component';
import { AccountEditComponent } from '../../components/admin/account-edit/account-edit.component';
import { AccountDeleteComponent } from '../../components/admin/account-delete/account-delete.component';

@Component({
  selector: 'arcadia-admin',
  imports: [
    CommonModule,
    MatTabsModule,
    AccountCreationComponent,
    AccountEditComponent,
    AccountDeleteComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {}
