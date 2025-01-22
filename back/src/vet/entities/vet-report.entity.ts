import { IsDate, IsNotEmpty } from 'class-validator';
import { Animal } from 'src/animal/entities/animal.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class VetReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @Column()
  @IsNotEmpty()
  food: string;

  @Column()
  @IsNotEmpty()
  foodWeight: number;

  @Column()
  details?: string;

  @OneToOne(() => Animal, (animal) => animal.vetReports)
  animal: Animal;
}
