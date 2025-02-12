import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalImage } from './entities/animal-image.entity';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { Breed } from './entities/breed.entity';
import { AnimalDto } from './dtos/animal.dto';
import { UpdateAnimalDto } from './dtos/update-animal.dto';
import { AnimalImageService } from './animal-image.service';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal) private readonly animalRepo: Repository<Animal>,
    @InjectRepository(Breed) private readonly breedRepo: Repository<Breed>,
    private animalImageService: AnimalImageService,
  ) {}

  async create(animalDto: AnimalDto) {
    const { name, birthDate, status, breedId, animalImage } = animalDto;

    const breed = await this.breedRepo.findOneBy({ id: breedId });
    if (!breed) {
      throw new InternalServerErrorException('Race non trouvée.');
    }

    let createdAnimalImage: AnimalImage;
    if (animalImage) {
      createdAnimalImage = await this.animalImageService.saveImage(animalImage);
    }

    const animal = this.animalRepo.create({
      name,
      birthDate,
      breed,
      animalImage: createdAnimalImage,
    });

    return this.animalRepo.save(animal);
  }

  async findAll() {
    const animals = await this.animalRepo.find();

    return {
      animals: animals,
    };
  }

  async findOne(id: number) {
    const animal = await this.animalRepo.findOneBy({ id });

    if (!animal) {
      throw new NotFoundException(`Animal ${animal.name} non trouvé.`);
    }

    return {
      message: 'Animal trouvé.',
      animal: animal,
    };
  }

  async update(id: number, updatedAnimalDto: UpdateAnimalDto) {
    const animal = await this.animalRepo.findOneBy({ id });

    if (!animal) {
      throw new NotFoundException(`Animal avec l'ID ${id} non trouvé.`);
    }

    if (updatedAnimalDto.animalImage) {
      if (animal.animalImage) {
        await this.animalImageService.deleteImage(animal.animalImage);
      }

      const newImage = await this.animalImageService.saveImage(
        updatedAnimalDto.animalImage,
      );
      animal.animalImage = newImage;
    }

    const updatedAnimal = Object.assign(animal, updatedAnimalDto);
    
    await this.animalRepo.save(updatedAnimal);

    return {
      message: 'Animal modifié.',
      animal: updatedAnimal,
    };
  }

  async delete(id: number) {
    const animal = await this.animalRepo.findOneBy({ id });

    if (!animal) {
      throw new NotFoundException(`Animal ${id} non trouvé.`);
    }

    await this.animalRepo.remove(animal);

    return {
      message: `Animal ${animal.name} supprimé avec succès.`,
    };
  }
}
