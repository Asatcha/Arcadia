import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dtos/create-animal.dto';
import { multerConfig } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBreedDto } from './dtos/create-breed.dto';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  // localhost:3000/animal
  @Post()
  @UseInterceptors(FileInterceptor('animalImage', multerConfig('animal')))
  create(
    @Body() createAnimalDto: CreateAnimalDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.animalService.create(createAnimalDto, file);
  }

  // localhost:3000/animal
  @Get()
  findAll() {
    return this.animalService.findAll();
  }

  // localhost:3000/animal/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.animalService.findOne(+id);
  }
  
  // // localhost:3000/animal/:id
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
  //   return this.animalService.update(+id, updateAnimalDto);
  // }

  // // localhost:3000/animal/:id
  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.animalService.delete(+id);
  // }
}
