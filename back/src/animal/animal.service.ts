import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalImage } from './entities/animal-image.entity';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { Breed } from './entities/breed.entity';
// import { UpdateAnimalDto } from './dtos/update-animal.dto';
// import { AnimalImageService } from './animal-image.service';
import { environment } from 'src/config/environment';
import { plainToInstance } from 'class-transformer';
import { CreateAnimalDto } from './dtos/create-animal.dto';
import { Habitat } from 'src/habitat/entities/habitat.entity';

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
      relations: [
        'animalImage',
        'breed',
        'habitat',
        'vetReports',
        'foodReports',
      ],
    });

    return animals.map((animal) => ({
      id: animal.id,
      name: animal.name,
      birthdate: animal.birthDate,
      breed: animal.breed,
      vetReports: animal.vetReports,
      foodReports: animal.foodReports,
      habitat: animal.habitat,
      animalImageUrl: animal.animalImage
        ? `${environment.baseUrl}/uploads/animal/${animal.animalImage.fileName}`
        : null,
      animalImage: animal.animalImage,
    }));
  }

  // async update(id: number, updatedAnimalDto: UpdateAnimalDto) {
  //   const animal = await this.animalRepo.findOneBy({ id });

  //   if (!animal) {
  //     throw new NotFoundException(`Animal avec l'ID ${id} non trouvé.`);
  //   }

  //   if (updatedAnimalDto.animalImage) {
  //     if (animal.animalImage) {
  //       await this.animalImageService.deleteImage(animal.animalImage);
  //     }

  //     const newImage = await this.animalImageService.saveImage(
  //       updatedAnimalDto.animalImage,
  //     );
  //     animal.animalImage = newImage;
  //   }

  //   const updatedAnimal = Object.assign(animal, updatedAnimalDto);

  //   await this.animalRepo.save(updatedAnimal);

  //   return {
  //     message: 'Animal modifié.',
  //     animal: updatedAnimal,
  //   };
  // }

  // async delete(id: number) {
  //   const animal = await this.animalRepo.findOneBy({ id });

  //   if (!animal) {
  //     throw new NotFoundException(`Animal ${id} non trouvé.`);
  //   }

  //   await this.animalRepo.remove(animal);

  //   return {
  //     message: `Animal ${animal.name} supprimé avec succès.`,
  //   };
  // }
}
