import { IsNotEmpty, MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { HabitatImage } from './habitat-image.entity';

@Entity()
@Unique(['name'])
export class Habitat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @MaxLength(1000)
  @IsNotEmpty()
  comments: string;

  @OneToOne(() => HabitatImage, (image) => image.habitat, { cascade: true })
  @JoinColumn()
  habitatImage: HabitatImage;
}
