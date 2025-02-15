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

@Module({
  controllers: [AnimalController, BreedController],
  providers: [AnimalService, BreedService],
  imports: [TypeOrmModule.forFeature([Animal, Breed, Habitat, AnimalImage])],
})
export class AnimalModule {}
