import { IsNotEmpty, MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ServiceImage } from './service-image.entity';

@Entity()
@Unique(['name'])
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @OneToOne(() => ServiceImage, (image) => image.service, { cascade: true })
  @JoinColumn()
  serviceImage: ServiceImage;
}
