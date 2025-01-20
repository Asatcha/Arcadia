import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { User } from "src/user/entities/user.entity";

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
