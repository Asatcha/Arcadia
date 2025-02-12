import { IsDate, IsNotEmpty, MaxLength } from 'class-validator';
import { Animal } from 'src/animal/entities/animal.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class VetReport {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  @MaxLength(1000)
  @IsNotEmpty()
  status: string;

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

  @ManyToOne(() => Animal, (animal) => animal.vetReports)
  animal: Animal;
}
