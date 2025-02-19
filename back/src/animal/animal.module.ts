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
import { FoodReport } from './entities/food-report.entity';
import { FoodReportService } from './food-report.service';
import { FoodReportController } from './food-report.controller';

@Module({
  controllers: [AnimalController, BreedController, FoodReportController],
  providers: [AnimalService, BreedService, FoodReportService],
  imports: [TypeOrmModule.forFeature([Animal, AnimalImage, Breed, Habitat, FoodReport])],
})
export class AnimalModule {}
