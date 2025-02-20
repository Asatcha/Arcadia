import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HabitatModule } from './habitat/habitat.module';
import { AnimalModule } from './animal/animal.module';
import { ServiceModule } from './service/service.module';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UPLOADS_FOLDER } from './config/multer.config';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './contact/contact.module';
import { TimetableModule } from './timetable/timetable.module';
import { RatingModule } from './rating/rating.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(UPLOADS_FOLDER),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    HabitatModule,
    AnimalModule,
    ServiceModule,
    ContactModule,
    TimetableModule,
    RatingModule,
  ],
  controllers: [AppController],
  providers: [AppService, TypeOrmConfigService, JwtModule],
})
export class AppModule {}
