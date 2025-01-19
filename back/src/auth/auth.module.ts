import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RegisterController } from './register.controller';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AuthController, RegisterController],
  providers: [AuthService, UserService],
  imports: [TypeOrmModule.forFeature([User, Role])]
})
export class AuthModule {}
