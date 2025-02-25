import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/auth/entities/role.entity';
import { plainToInstance } from 'class-transformer';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto | RegisterDto) {
    const { email, password, firstName, lastName, roleId } = createUserDto;

    const foundUser = await this.userRepo.findOneBy({ email });

    if (foundUser) {
      throw new InternalServerErrorException('Utilisateur déjà existant.');
    }

    const newUser = this.userRepo.create({
      email,
      password,
      firstName,
      lastName,
      role: await this.roleRepo.findOneBy({ id: roleId }),
    });

    await this.userRepo.save(newUser);

    await this.mailService.sendUserCreationEmail(email, newUser);

    return plainToInstance(User, newUser);
  }

  async findAll() {
    const users = await this.userRepo.find({ relations: ['role'] });

    return plainToInstance(User, users);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé.`);
    }

    if (updateUserDto.roleId) {
      user.role.id = updateUserDto.roleId;
    }

    const updatedUser = { ...user, ...updateUserDto };

    await this.userRepo.save(updatedUser);

    return plainToInstance(User, updatedUser);
  }

  async delete(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé.`);
    }

    const deletedUser = await this.userRepo.remove(user);

    return plainToInstance(User, deletedUser);
  }
}
