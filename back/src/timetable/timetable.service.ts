import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTimetableDto } from './dtos/update-timetable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Timetable } from './entities/timetable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimetableService {
  constructor(
    @InjectRepository(Timetable) private timetableRepo: Repository<Timetable>,
  ) {}

  async findAll() {
    const timetables = await this.timetableRepo.find({ order: { id: 'ASC' } });
    return timetables;
  }

  async update(id: number, updateTimetableDto: UpdateTimetableDto) {
    const timetable = await this.timetableRepo.findOneBy({ id });

    if (!timetable) {
      throw new NotFoundException(`Horaires pour l'id ${id} non trouvés.`);
    }

    const updatedTimetable = { ...timetable, ...updateTimetableDto };

    await this.timetableRepo.save(updatedTimetable);

    return updatedTimetable;
  }
}
