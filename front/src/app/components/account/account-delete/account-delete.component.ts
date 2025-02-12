import { AsyncPipe, CommonModule } from '@angular/common';
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
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, startWith } from 'rxjs';
import { User } from '../../../shared/user.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'arcadia-account-delete',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatExpansionModule,
    AsyncPipe,
    MatAutocompleteModule,
  ],
  templateUrl: './account-delete.component.html',
  styleUrl: './account-delete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDeleteComponent implements OnInit {
  users = input.required<User[]>();
  userEmails = input.required<string[]>();
  reloadUsers = output<void>();
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  filteredUserEmails$!: Observable<string[]>;
  readonly panelOpenState = signal(false);

  deleteForm: FormGroup = this.fb.group({
    id: [0],
    email: ['', [Validators.required, Validators.email]],
  });

  email = this.deleteForm.get('email') as FormControl<string>;

  ngOnInit() {
    this.loadEmailFilter();
  }

  loadEmailFilter() {
    this.filteredUserEmails$ = this.email.valueChanges.pipe(
      startWith(''),
      map((email) => {
        return email ? this._filter(email) : this.userEmails().slice();
      })
    );
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

  onSubmit() {
    const emailValue = this.deleteForm.value.email;

    if (!emailValue) {
      console.error('Aucun email saisi !');
      return;
    }

    const user = this.users().find(
      (user) =>
        user.email.toLocaleLowerCase() === emailValue.toLocaleLowerCase()
    );

    if (!user) {
      console.error('Aucun utilisateur trouvé avec cet email !');
      return;
    }

    this.deleteForm.patchValue({ id: user.id });

    this.adminService.deleteUserById(user.id).subscribe({
      next: () => {
        this.deleteForm.reset();
        this.reloadUsers.emit();
      },
      error: (err) => console.error('Erreur lors de la suppression :', err),
    });
  }
}
