import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitat } from './entities/habitat.entity';
import { CreateHabitatDto } from './dtos/create-habitat.dto';
import { UpdateHabitatDto } from './dtos/update-habitat.dto';
import { HabitatImage } from './entities/habitat-image.entity';
import { HabitatImageService } from './habitat-image.service';

@Injectable()
export class HabitatService {
  constructor(
    @InjectRepository(Habitat) private habitatRepo: Repository<Habitat>,
    private habitatImageService: HabitatImageService,
  ) {}

  async create(createdHabitatDto: CreateHabitatDto) {
    const { name, description, comments, habitatImage } = createdHabitatDto;

    const foundHabitat = await this.habitatRepo.findOneBy({ name });

    if (foundHabitat) {
      throw new InternalServerErrorException('Habitat déjà existant.');
    }

    let createdHabitatImage: HabitatImage;
    if (habitatImage) {
      createdHabitatImage =
        await this.habitatImageService.saveImage(habitatImage);
    }

    const newHabitat = this.habitatRepo.create({
      name,
      description,
      comments,
      habitatImage: createdHabitatImage,
    });

    await this.habitatRepo.save(newHabitat);

    return {
      message: 'Habitat créé.',
      habitat: newHabitat,
    };
  }

  async findAll() {
    const habitats = await this.habitatRepo.find();

    return {
      habitats: habitats,
    };
  }

  async findOne(id: number) {
    const habitat = await this.habitatRepo.findOneBy({ id });

    if (!habitat) {
      throw new NotFoundException(`Habitat ${habitat.name} non trouvé.`);
    }

    return {
      message: 'Habitat trouvé.',
      habitat: habitat,
    };
  }

  async update(id: number, updatedHabitatDto: UpdateHabitatDto) {
    const habitat = await this.habitatRepo.findOneBy({ id });

    if (!habitat) {
      throw new NotFoundException(`Habitat ${habitat.name} non trouvé.`);
    }

    if (updatedHabitatDto.habitatImage) {
      if (habitat.habitatImage) {
        await this.habitatImageService.deleteImage(habitat.habitatImage);
      }

      const newImage = await this.habitatImageService.saveImage(
        updatedHabitatDto.habitatImage,
      );
      habitat.habitatImage = newImage;
    }

    const updatedHabitat = Object.assign(habitat, updatedHabitatDto);

    await this.habitatRepo.save(updatedHabitat);

    return {
      message: 'Habitat modifié.',
      habitat: updatedHabitat,
    };
  }

  async delete(id: number) {
    const habitat = await this.habitatRepo.findOneBy({ id });

    if (!habitat) {
      throw new NotFoundException(`Habitat ${id} non trouvé.`);
    }

    await this.habitatRepo.remove(habitat);

    return {
      message: `Habitat ${habitat.name} supprimé avec succès.`,
    };
  }
}
