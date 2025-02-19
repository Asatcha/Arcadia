import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timetable } from './entities/timetable.entity';

@Module({
  controllers: [TimetableController],
  providers: [TimetableService],
  imports: [TypeOrmModule.forFeature([Timetable])],
})
export class TimetableModule {}
