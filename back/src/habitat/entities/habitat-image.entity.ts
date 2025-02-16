import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Habitat } from './habitat.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['fileName'])
export class HabitatImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @OneToOne(() => Habitat, (habitat) => habitat.habitatImage)
  @Exclude()
  habitat: Habitat;
}
