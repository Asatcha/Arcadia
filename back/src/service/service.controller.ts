import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dtos/create-service.dto';
import { UpdateServiceDto } from './dtos/update-service.dto';
import { UpdateHabitatDto } from 'src/habitat/dtos/update-habitat.dto';


// localhost:3000/service
@Controller('Service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  // localhost:3000/service
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  // localhost:3000/service
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  // localhost:3000/service/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  // localhost:3000/service/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  // localhost:3000/service/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviceService.delete(+id);
  }
}

