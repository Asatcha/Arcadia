import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AdminService } from '../../../pages/admin/admin.service';
import { User } from '../../../shared/user.model';

@Component({
  selector: 'arcadia-account-edit',
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountEditComponent implements OnInit {
  private fb = inject(FormBuilder).nonNullable;
  private adminService = inject(AdminService);
  users = input.required<User[]>();
  userEmails = input.required<string[]>();
  reloadUsers = output<void>();
  filteredUserEmails$!: Observable<string[]>;
  isLoading$ = signal(true);
  readonly panelOpenState$ = signal(false);

  editForm = this.fb.group({
    id: [0],
    firstName: ['', [Validators.maxLength(20), Validators.required]],
    lastName: ['', [Validators.maxLength(20), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8)]],
    roleId: [0, [Validators.required]],
  });

  email = this.editForm.get('email') as FormControl<string>;

  ngOnInit() {
    this.loadEmailFilter();
  }

  displayFn(email: string): string {
    return email;
  }

  private _filter(email: string): string[] {
    const filterValue = email.toLowerCase();

    return this.userEmails().filter((email) =>
      email.toLocaleLowerCase().includes(filterValue)
    );
  }

  loadEmailFilter() {
    this.filteredUserEmails$ = this.editForm.get('email')!.valueChanges.pipe(
      startWith(''),
      map((email) => {
        return email ? this._filter(email) : this.userEmails().slice();
      })
    );
  }

  findUserByEmail(email: string) {
    const user = this.users().find(
      (user) => user.email.toLocaleLowerCase() === email.toLocaleLowerCase()
    );

    if (user) {
      this.editForm.patchValue({
        ...user,
        roleId: user.role.id,
      });
    } else {
      console.error('Aucun utilisateur trouvé avec cet email');
    }
  }

  onBackButton() {
    this.isLoading$.set(true);
    this.editForm.reset();
  }

  onResetButton(stepper: MatStepper) {
    stepper.reset();
    this.editForm.reset();
    this.loadEmailFilter();
  }

  updateUserById() {
    this.isLoading$.set(true);

    const formData = this.editForm.value;
    const userId = formData.id;

    if (!userId) {
      console.error('Impossible de mettre à jour : ID utilisateur manquant');
      this.isLoading$.set(false);
      return;
    }

    const updatedUser: Partial<User> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      roleId: formData.roleId,
    };

    if (formData.password && formData.password.trim() !== '') {
      updatedUser.password = formData.password;
    }

    this.adminService.updateUser(userId, updatedUser).subscribe({
      next: () => {
        this.isLoading$.set(false);
        this.reloadUsers.emit();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour :', err);
        this.isLoading$.set(false);
      },
    });
  }
}
