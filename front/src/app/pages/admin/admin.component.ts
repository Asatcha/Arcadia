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
import { HabitatEditComponent } from '../../components/habitat/habitat-edit/habitat-edit.component';
import { AnimalCreationComponent } from '../../components/animal/animal-creation/animal-creation.component';
import { Animal } from '../../models/animal.model';
import { AnimalService } from '../../services/animal.service';
import { Breed } from '../../models/breed.model';
import { BreedCreationComponent } from '../../components/animal/breed-creation/breed-creation.component';
import { Role } from '../../models/role.model';

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
    HabitatEditComponent,
    BreedCreationComponent,
    AnimalCreationComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  private userService = inject(UserService);
  private habitatService = inject(HabitatService);
  private animalService = inject(AnimalService);
  roles$ = signal<Role[]>([]);
  roleLabels$ = signal<string[]>([]);
  users$ = signal<User[]>([]);
  userEmails$ = signal<string[]>([]);
  habitats$ = signal<Habitat[]>([]);
  habitatNames$ = signal<string[]>([]);
  breeds$ = signal<Breed[]>([]);
  breedNames$ = signal<string[]>([]);
  animals$ = signal<Animal[]>([]);
  animalNames$ = signal<string[]>([]);
  isLoadingRoles$ = signal(true);
  isLoadingUsers$ = signal(true);
  isLoadingHabitats$ = signal(true);
  isLoadingBreeds$ = signal(true);
  isLoadingAnimals$ = signal(true);

  ngOnInit() {
    this.loadAllUsers();
    this.loadAllHabitats();
    this.loadAllBreeds();
    this.loadAllAnimals();
    this.loadAllRoles();
  }

  loadAllRoles() {
    this.userService.findAllRoles().subscribe({
      next: (roles) => {
        this.roles$.set(roles);
        this.roleLabels$.set(roles.map((role) => role.label));
        this.isLoadingRoles$.set(false);
      },
    });
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
    });
  }

  loadAllBreeds() {
    this.animalService.findAllBreeds().subscribe({
      next: (breeds) => {
        this.breeds$.set(breeds);
        this.breedNames$.set(breeds.map((breed) => breed.name));
        this.isLoadingBreeds$.set(false);
      },
    });
  }

  loadAllAnimals() {
    this.animalService.findAllAnimals().subscribe({
      next: (animals) => {
        this.animals$.set(animals);
        this.animalNames$.set(animals.map((animal) => animal.name));
        this.isLoadingAnimals$.set(false);
      },
    });
  }
}
