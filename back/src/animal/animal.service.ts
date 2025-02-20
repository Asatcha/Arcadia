import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalImage } from './entities/animal-image.entity';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { Breed } from './entities/breed.entity';
import { plainToInstance } from 'class-transformer';
import { CreateAnimalDto } from './dtos/create-animal.dto';
import { Habitat } from 'src/habitat/entities/habitat.entity';
import { UpdateAnimalDto } from './dtos/update-animal.dto';
import { join } from 'path';
import { UPLOADS_FOLDER } from 'src/config/multer.config';
import { existsSync, unlinkSync } from 'fs';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal) private readonly animalRepo: Repository<Animal>,
    @InjectRepository(Breed) private readonly breedRepo: Repository<Breed>,
    @InjectRepository(Habitat)
    private readonly habitatRepo: Repository<Habitat>,
    @InjectRepository(AnimalImage)
    private animalImageRepo: Repository<AnimalImage>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto, file: Express.Multer.File) {
    const { name, birthDate, breedId, habitatId } = createAnimalDto;

    const foundAnimal = await this.animalRepo.findOneBy({ name });

    if (foundAnimal) {
      throw new InternalServerErrorException('Animal déjà existant.');
    }

    const breed = await this.breedRepo.findOneBy({ id: breedId });

    if (!breed) {
      throw new InternalServerErrorException('Race non trouvée.');
    }

    const newAnimal = this.animalRepo.create({
      name,
      birthDate,
      breed: await this.breedRepo.findOneBy({ id: breedId }),
      habitat: await this.habitatRepo.findOneBy({ id: habitatId }),
    });

    if (file) {
      const createdAnimalImage = new AnimalImage();
      createdAnimalImage.fileName = file.filename;
      createdAnimalImage.animal = newAnimal;

      await this.animalImageRepo.save(createdAnimalImage);
      newAnimal.animalImage = createdAnimalImage;
      await this.animalRepo.save(newAnimal);
    }

    return plainToInstance(Animal, newAnimal);
  }

  async findAll() {
    const animals = await this.animalRepo.find({
      relations: ['animalImage', 'breed', 'habitat', 'vetReports'],
    });

    return animals;
  }

  async findAllWithLatestVetReport() {
    const animals = await this.animalRepo.find({
      relations: ['vetReports'],
    });

    return animals;
  }

  async findAllByHabitat(habitatId: number) {
    const animals = this.animalRepo.find({
      where: { habitat: { id: habitatId } },
      relations: ['animalImage', 'breed', 'habitat', 'vetReports'],
    });

    return animals;
  }

  async update(
    id: number,
    updateAnimalDto: UpdateAnimalDto,
    file?: Express.Multer.File,
  ): Promise<Animal> {
    const animal = await this.animalRepo.findOne({
      where: { id },
      relations: ['animalImage', 'breed', 'habitat', 'vetReports'],
    });

    if (!animal) {
      throw new NotFoundException('Animal non trouvé');
    }

    animal.name = updateAnimalDto.name ?? animal.name;
    animal.birthDate = updateAnimalDto.birthDate ?? animal.birthDate;
    animal.breed.id = updateAnimalDto.breedId ?? animal.breed.id;
    animal.habitat.id = updateAnimalDto.habitatId ?? animal.habitat.id;

    if (file) {
      if (animal.animalImage) {
        const oldFilePath = join(
          UPLOADS_FOLDER,
          'animal',
          animal.animalImage.fileName,
        );
        if (existsSync(oldFilePath)) {
          try {
            unlinkSync(oldFilePath);
          } catch (error) {
            console.error(
              "Erreur lors de la suppression de l'ancienne image :",
              error,
            );
          }
        }
      }

      const newAnimalImage = new AnimalImage();
      newAnimalImage.fileName = file.filename;
      newAnimalImage.animal = animal;

      await this.animalImageRepo.save(newAnimalImage);

      animal.animalImage = newAnimalImage;
    }

    await this.animalRepo.save(animal);

    return plainToInstance(Animal, animal);
  }

  async delete(id: number): Promise<Animal> {
    const animal = await this.animalRepo.findOne({
      where: { id },
      relations: ['animalImage'],
    });

    if (!animal) {
      throw new NotFoundException('Animal non trouvé');
    }

    if (animal.animalImage) {
      const filePath = join(
        UPLOADS_FOLDER,
        'animal',
        animal.animalImage.fileName,
      );
      if (existsSync(filePath)) {
        try {
          unlinkSync(filePath);
        } catch (error) {
          console.error(
            'Erreur lors de la suppression du fichier image :',
            error,
          );
        }
      }
    }

    await this.animalRepo.remove(animal);
    await this.animalImageRepo.remove(animal.animalImage);

    return animal;
  }
}
