import { IsNotEmpty, MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { HabitatImage } from './habitat-image.entity';
import { Animal } from 'src/animal/entities/animal.entity';

@Entity()
@Unique(['name'])
export class Habitat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(20)
  @IsNotEmpty()
  name: string;

  @Column()
  @MaxLength(1000)
  @IsNotEmpty()
  description: string;

  @Column()
  @MaxLength(1000)
  @IsNotEmpty()
  comments: string;

  @OneToMany(() => Animal, (animal) => animal.habitat)
  animals: Animal[];

  // TODO: handle cascade delete
  @OneToOne(() => HabitatImage, (image) => image.habitat, { cascade: true, onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinColumn()
  habitatImage: HabitatImage;
}
