import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { UpdateTimetableDto } from './dtos/update-timetable.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role, Roles } from 'src/auth/roles.decorator';

@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  // localhost:3000/timetable
  @Get()
  findAll() {
    return this.timetableService.findAll();
  }

  // localhost:3000/timetable/:id
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateTimetableDto: UpdateTimetableDto,
  ) {
    return this.timetableService.update(+id, updateTimetableDto);
  }
}
