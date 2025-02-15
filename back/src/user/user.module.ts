import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/auth/entities/role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService],
  imports: [TypeOrmModule.forFeature([User, Role])]
})
export class UserModule {}
