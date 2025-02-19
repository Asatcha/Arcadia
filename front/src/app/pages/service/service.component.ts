import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Service } from '../../models/service.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'arcadia-service',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private serviceService = inject(ServiceService);

  dialog = inject(MatDialog);

  services$ = signal<Service[]>([]);
  serviceName$ = signal<string>('Les services');
  isLoadingServices$ = signal(true);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const serviceId = params['serviceId'];
      if (serviceId) {
        this.loadService(serviceId);
      } else {
        this.loadAllServices();
      }
    });
  }

  loadAllServices() {
    this.serviceService.findAllServices().subscribe((services) => {
      this.services$.set(services);
      this.isLoadingServices$.set(false);
    });
  }

  loadService(serviceId: number) {
    this.serviceService.findServiceById(serviceId).subscribe((service) => {
      if (!service) {
        this.router.navigate(['/service']);
      } else {
        this.serviceName$.set(`Les services`);
      }
    });
  }
}
