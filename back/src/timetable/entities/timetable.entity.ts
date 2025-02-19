import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['dayOfWeek'])
export class Timetable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  dayOfWeek: string;

  @Column({ type: 'time' })
  @IsNotEmpty()
  openingTime: string;

  @Column({ type: 'time' })
  @IsNotEmpty()
  closingTime: string;

  @Column({ default: false })
  @IsNotEmpty()
  isClosed: boolean;
}
