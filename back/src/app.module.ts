import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HabitatModule } from './habitat/habitat.module';
import { AnimalModule } from './animal/animal.module';
import { VetModule } from './vet/vet.module';
import { EmployeeModule } from './employee/employee.module';
import { ServiceModule } from './service/service.module';
import { TypeOrmConfigService } from './config/typeorm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UserModule,
    HabitatModule,
    AnimalModule,
    VetModule,
    EmployeeModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService, TypeOrmConfigService],
})
export class AppModule {}
