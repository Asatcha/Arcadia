import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RegisterController } from './register.controller';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Global()
@Module({
  controllers: [AuthController, RegisterController],
  providers: [AuthService, UserService, JwtService],
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    MailModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  exports: [JwtService],
})
export class AuthModule {}
