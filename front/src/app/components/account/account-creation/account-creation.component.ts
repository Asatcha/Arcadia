import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../models/role.model';

@Component({
  selector: 'arcadia-account-creation',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
  ],
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountCreationComponent {
  roles = input.required<Role[]>();
  roleLabels = input.required<string[]>();
  reloadUsers = output<void>();
  private fb = inject(FormBuilder).nonNullable;
  private userService = inject(UserService);
  readonly panelOpenState = signal(false);

  accountForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    roleId: [null, [Validators.required]],
  });

  submit() {
    this.userService.createUser(this.accountForm.value).subscribe({
      next: () => {
        this.accountForm.reset();
        this.reloadUsers.emit();
      },
    });
  }
}
