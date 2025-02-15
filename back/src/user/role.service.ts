import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/auth/entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  async findAll() {
    const roles = await this.roleRepo.find();

    return roles;
  }
}
