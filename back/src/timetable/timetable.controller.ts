import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { UpdateTimetableDto } from './dtos/update-timetable.dto';

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
  update(
    @Param('id') id: string,
    @Body() updateTimetableDto: UpdateTimetableDto,
  ) {
    return this.timetableService.update(+id, updateTimetableDto);
  }
}
