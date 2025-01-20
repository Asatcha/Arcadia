import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HabitatService } from './habitat.service';
import { CreateHabitatDto } from './dtos/create-habitat.dto';
import { UpdateHabitatDto } from './dtos/update-habitat.dto';

// localhost:3000/habitat
@Controller('habitat')
export class HabitatController {
  constructor(private readonly habitatService: HabitatService) {}

  // localhost:3000/habitat
  @Post()
  create(@Body() createHabitatDto: CreateHabitatDto) {
    return this.habitatService.create(createHabitatDto);
  }

  // localhost:3000/habitat
  @Get()
  findAll() {
    return this.habitatService.findAll();
  }

  // localhost:3000/habitat/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitatService.findOne(+id);
  }

  // localhost:3000/habitat/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitatDto: UpdateHabitatDto) {
    return this.habitatService.update(+id, updateHabitatDto);
  }

  // localhost:3000/habitat/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.habitatService.delete(+id);
  }
}
