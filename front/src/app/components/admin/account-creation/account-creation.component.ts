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
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminService } from '../../../pages/admin/admin.service';

@Component({
  selector: 'arcadia-account-creation',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatExpansionModule,
  ],
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountCreationComponent {
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  readonly panelOpenState = signal(false);

  accountForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    roleId: [null, [Validators.required, Validators.minLength(8)]],
  });

  submit() {
    this.adminService.createUser(this.accountForm.value).subscribe({
      next: (createdUser) => {
        // TODO: récupérer token
      },
      error: (err) => {
        console.error('Erreur :', err);
      },
    });
    this.accountForm.reset();
  }
}
