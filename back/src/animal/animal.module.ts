import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Breed } from './entities/breed.entity';
import { AnimalImage } from './entities/animal-image.entity';
import { AnimalImageService } from './animal-image.service';

@Module({
  controllers: [AnimalController],
  providers: [AnimalService, AnimalImageService],
  imports: [TypeOrmModule.forFeature([Animal, Breed, AnimalImage])],
})
export class AnimalModule {}
