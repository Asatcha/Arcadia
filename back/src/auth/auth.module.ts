import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { RegisterController } from './register.controller';

@Module({
  controllers: [AuthController, RegisterController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([User, Role])]
})
export class AuthModule {}
