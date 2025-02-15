import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
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
import { User } from '../../../models/user.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'arcadia-account-delete',
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './account-delete.component.html',
  styleUrl: './account-delete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDeleteComponent implements OnInit, OnChanges {
  users = input.required<User[]>();
  userEmails = input.required<string[]>();
  reloadUsers = output<void>();
  private fb = inject(FormBuilder).nonNullable;
  private userService = inject(UserService);
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users'] || changes['userEmails']) {
      this.loadEmailFilter();
    }
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
    const filterValue = email.toLocaleLowerCase();

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

    this.userService.deleteUserById(user.id).subscribe({
      next: () => {
        this.deleteForm.reset();
        this.reloadUsers.emit();
      },
    });
  }
}
