import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dtos/create-animal.dto';
import { multerConfig } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateAnimalDto } from './dtos/update-animal.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role, Roles } from 'src/auth/roles.decorator';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  // localhost:3000/animal
  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('animalImage', multerConfig('animal')))
  create(
    @Body() createAnimalDto: CreateAnimalDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.animalService.create(createAnimalDto, file);
  }

  // localhost:3000/animal?habitatId=1
  @Get()
  findAllByHabitat(@Query('habitatId') habitatId: string) {
    if (habitatId) {
      return this.animalService.findAllByHabitat(+habitatId);
    }
    return this.animalService.findAll();
  }

  // localhost:3000/animal
  @Get()
  findAll() {
    return this.animalService.findAll();
  }

  // localhost:3000/animal/latest-vet-report
  @Get('latest-vet-report')
  findAllWithLatestVetReport() {
    return this.animalService.findAllWithLatestVetReport();
  }

  // localhost:3000/animal/:id
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('animalImage', multerConfig('animal')))
  update(
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.animalService.update(+id, updateAnimalDto, file);
  }

  // localhost:3000/animal/:id
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  delete(@Param('id') id: string) {
    return this.animalService.delete(+id);
  }
}
