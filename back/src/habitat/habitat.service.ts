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

@Injectable()
export class HabitatService {
  constructor(@InjectRepository(Habitat) private habitatRepo: Repository<Habitat>) {}

  async create(createHabitatDto: CreateHabitatDto) {
    const { name, description, comments } = createHabitatDto;

    const foundHabitat = await this.habitatRepo.findOneBy({ name });

    if (foundHabitat) {
      throw new InternalServerErrorException('Habitat déjà existant.');
    }

    const newHabitat = this.habitatRepo.create({
      name,
      description,
      comments,
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
    }
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

  async update(id: number, updateHabitatDto: UpdateHabitatDto) {
    const habitat = await this.habitatRepo.findOneBy({ id });

    if (!habitat) {
      throw new NotFoundException(`Habitat ${habitat.name} non trouvé.`);
    }

    const updatedHabitat = { ...habitat, ...updateHabitatDto };

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
