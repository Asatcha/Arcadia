import { Base } from './base.model';
import { EmployeeVetReport } from './employee-vet-report.model';
import { VetReport } from './vet-report.model';

export interface Animal extends Base {
  name: string;
  status: string;
  birthDate: Date;
  animalImage: AnimalImage;
  animalImageId: number;
  animalImageUrl: string;
  breed: Breed;
  breedId: number;
  habitat: Habitat;
  habitatId: number;
  latestVetReport: VetReport;
  vetReports: VetReport[];
}
