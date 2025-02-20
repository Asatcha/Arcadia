import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AnimalService } from '../../services/animal.service';
import { ServiceService } from '../../services/service.service';
import { ServiceEditComponent } from '../../components/service/service-edit/service-edit.component';
import { Service } from '../../models/service.model';
import { RatingService } from '../../services/rating.service';
import { Rating } from '../../models/rating.model';
import { Animal } from '../../models/animal.model';
import { RatingEditComponent } from '../../components/rating/rating-edit/rating-edit.component';
import { EmployeeVetReportCreationComponent } from '../../components/animal/employee-vet-report-creation/employee-vet-report-creation.component';

@Component({
  selector: 'arcadia-employee',
  imports: [
    CommonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    ServiceEditComponent,
    RatingEditComponent,
    EmployeeVetReportCreationComponent,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
  private animalService = inject(AnimalService);
  private serviceService = inject(ServiceService);
  private ratingService = inject(RatingService);
  services$ = signal<Service[]>([]);
  serviceNames$ = signal<string[]>([]);
  animals$ = signal<Animal[]>([]);
  animalNames$ = signal<string[]>([]);
  ratingsToValidate$ = signal<Rating[]>([]);
  isLoadingAnimals$ = signal(true);
  isLoadingServices$ = signal(true);
  isLoadingRatingsToValidate$ = signal(true);

  ngOnInit() {
    this.loadAllAnimals();
    this.loadAllServices();
    this.loadAllRatingsToValidate();
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

  loadAllServices() {
    this.serviceService.findAllServices().subscribe({
      next: (services) => {
        this.services$.set(services);
        this.serviceNames$.set(services.map((service) => service.name));
        this.isLoadingServices$.set(false);
      },
    });
  }

  loadAllRatingsToValidate() {
    this.ratingService.findAllRatingsToValidate().subscribe({
      next: (ratingsToValidate) => {
        this.ratingsToValidate$.set(ratingsToValidate);
        this.isLoadingRatingsToValidate$.set(false);
      },
    });
  }
}
