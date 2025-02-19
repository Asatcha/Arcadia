import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Service } from './service.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['fileName'])
export class ServiceImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @OneToOne(() => Service, (service) => service.serviceImage)
  @Exclude()
  service: Service;
}
