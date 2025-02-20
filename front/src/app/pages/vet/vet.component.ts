import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal.model';
import { VetReportEditComponent } from '../../components/animal/vet-report-edit/vet-report-edit.component';

@Component({
  selector: 'arcadia-vet',
  imports: [CommonModule, MatTabsModule, MatProgressSpinnerModule, VetReportEditComponent],
  templateUrl: './vet.component.html',
  styleUrl: './vet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VetComponent {
  private animalService = inject(AnimalService);
  animalsWithLatestVetReport$ = signal<Animal[]>([]);
  animalNames$ = signal<string[]>([]);
  isLoadingAnimalsWithLatestVetReport$ = signal(true);

  ngOnInit() {
    this.loadAllAnimalsWithLatestVetReport();
  }

  loadAllAnimalsWithLatestVetReport() {
    this.animalService.findAllAnimalsWithLatestVetReport().subscribe({
      next: (animalsWithLatestVetReport) => {
        this.animalsWithLatestVetReport$.set(animalsWithLatestVetReport);
        this.animalNames$.set(animalsWithLatestVetReport.map((animal) => animal.name));
        this.isLoadingAnimalsWithLatestVetReport$.set(false);
      },
    });
  }
}
