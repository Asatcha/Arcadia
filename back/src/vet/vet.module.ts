import { Module } from '@nestjs/common';
import { VetService } from './vet.service';
import { VetController } from './vet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VetReport } from './entities/vet-report.entity';
import { Habitat } from 'src/habitat/entities/habitat.entity';

@Module({
  controllers: [VetController],
  providers: [VetService],
  imports: [TypeOrmModule.forFeature([VetReport, Habitat])],
})
export class VetModule {}
