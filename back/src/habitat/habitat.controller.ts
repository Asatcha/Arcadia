import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { HabitatService } from './habitat.service';
import { CreateHabitatDto } from './dtos/create-habitat.dto';
import { UpdateHabitatDto } from './dtos/update-habitat.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';

// localhost:3000/habitat
@Controller('habitat')
export class HabitatController {
  constructor(private readonly habitatService: HabitatService) {}

  // localhost:3000/habitat
  @Post()
  @UseInterceptors(FileInterceptor('habitatImage', multerConfig('habitat')))
  create(
    @Body() createHabitatDto: CreateHabitatDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.habitatService.create(createHabitatDto, file);
  }

  // localhost:3000/habitat
  @Get()
  findAll() {
    return this.habitatService.findAll();
  }

  // localhost:3000/habitat/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.habitatService.findOne(+id);
  }

  // localhost:3000/habitat/:id
  @Patch(':id')
  @UseInterceptors(FileInterceptor('habitatImage', multerConfig('habitat')))
  update(
    @Param('id') id: string,
    @Body() updateHabitatDto: UpdateHabitatDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.habitatService.update(+id, updateHabitatDto, file);
  }

  // localhost:3000/habitat/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.habitatService.delete(+id);
  }
}
