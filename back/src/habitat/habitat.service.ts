import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitat } from './entities/habitat.entity';
import { CreateHabitatDto } from './dtos/create-habitat.dto';
import { HabitatImage } from './entities/habitat-image.entity';
import { plainToInstance } from 'class-transformer';
import { environment } from 'src/config/environment';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { UPLOADS_FOLDER } from 'src/config/multer.config';
import { UpdateHabitatDto } from './dtos/update-habitat.dto';

@Injectable()
export class HabitatService {
  constructor(
    @InjectRepository(Habitat) private habitatRepo: Repository<Habitat>,
    @InjectRepository(HabitatImage)
    private habitatImageRepo: Repository<HabitatImage>,
  ) {}

  async create(createHabitatDto: CreateHabitatDto, file: Express.Multer.File) {
    const { name, description, comments } = createHabitatDto;

    const foundHabitat = await this.habitatRepo.findOneBy({ name });

    if (foundHabitat) {
      throw new InternalServerErrorException('Habitat déjà existant.');
    }

    const newHabitat = this.habitatRepo.create({ name, description, comments });

    if (file) {
      const createdHabitatImage = new HabitatImage();
      createdHabitatImage.fileName = file.filename;
      createdHabitatImage.habitat = newHabitat;

      await this.habitatImageRepo.save(createdHabitatImage);
      newHabitat.habitatImage = createdHabitatImage;
      await this.habitatRepo.save(newHabitat);
    }

    return plainToInstance(Habitat, newHabitat);
  }

  async findAll() {
    const habitats = await this.habitatRepo.find({
      relations: ['habitatImage'],
    });

    return habitats.map((habitat) => ({
      id: habitat.id,
      name: habitat.name,
      description: habitat.description,
      comments: habitat.comments,
      habitatImageUrl: habitat.habitatImage
        ? `${environment.baseUrl}/uploads/habitat/${habitat.habitatImage.fileName}`
        : null,
      habitatImage: habitat.habitatImage,
    }));
  }

  async update(
    id: number,
    updateHabitatDto: UpdateHabitatDto,
    file?: Express.Multer.File,
  ): Promise<Habitat> {
    const habitat = await this.habitatRepo.findOne({
      where: { id },
      relations: ['habitatImage'],
    });

    if (!habitat) {
      throw new NotFoundException('Habitat non trouvé');
    }

    habitat.name = updateHabitatDto.name ?? habitat.name;
    habitat.description = updateHabitatDto.description ?? habitat.description;
    habitat.comments = updateHabitatDto.comments ?? habitat.comments;

    if (file) {
      if (habitat.habitatImage) {
        const oldFilePath = join(
          UPLOADS_FOLDER,
          'habitat',
          habitat.habitatImage.fileName,
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

        await this.habitatImageRepo.remove(habitat.habitatImage);
      }

      const newHabitatImage = new HabitatImage();
      newHabitatImage.fileName = file.filename;
      newHabitatImage.habitat = habitat;

      await this.habitatImageRepo.save(newHabitatImage);

      habitat.habitatImage = newHabitatImage;
    }

    await this.habitatRepo.save(habitat);

    return plainToInstance(Habitat, habitat);
  }

  async delete(id: number): Promise<Habitat> {
    const habitat = await this.habitatRepo.findOne({
      where: { id },
      relations: ['habitatImage'],
    });
    if (!habitat) {
      throw new NotFoundException('Habitat non trouvé');
    }

    if (habitat.habitatImage) {
      const filePath = join(
        UPLOADS_FOLDER,
        'habitat',
        habitat.habitatImage.fileName,
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
    await this.habitatImageRepo.remove(habitat.habitatImage);

    await this.habitatRepo.remove(habitat);
    return habitat;
  }
}
