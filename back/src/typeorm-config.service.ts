import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Role } from './auth/entities/role.entity';
import { User } from './user/entities/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nestuser',
      password: 'nestpassword',
      database: 'arcadiadb',
      entities: ['dist/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
