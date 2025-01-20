import { OmitType, PartialType } from '@nestjs/mapped-types';
import { HabitatDto } from './habitat.dto';

export class UpdateHabitatDto extends PartialType(HabitatDto) {}
