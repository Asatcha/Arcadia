import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Breed } from './entities/breed.entity';
import { AnimalImage } from './entities/animal-image.entity';
import { BreedController } from './breed.controller';
import { BreedService } from './breed.service';
import { Habitat } from 'src/habitat/entities/habitat.entity';
import { VetReportController } from './vet-report.controller';
import { VetReportService } from './vet-report.service';
import { VetReport } from './entities/vet-report.entity';

@Module({
  controllers: [AnimalController, BreedController, VetReportController],
  providers: [AnimalService, BreedService, VetReportService],
  imports: [
    TypeOrmModule.forFeature([Animal, AnimalImage, Breed, Habitat, VetReport]),
  ],
})
export class AnimalModule {}
