import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
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
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'arcadia-account-creation',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatExpansionModule,
  ],
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountCreationComponent {
  reloadUsers = output<void>();
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
      next: () => {
        this.accountForm.reset();
        this.reloadUsers.emit();
      },
      error: (err) => {
        console.error('Erreur :', err);
      },
    });
  }
}
