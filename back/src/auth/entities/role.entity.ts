import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    @IsNotEmpty()
    label: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
