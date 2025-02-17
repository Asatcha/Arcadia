import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

dotenv.config(); // Charger les variables d'environnement

const env =
  process.env.NODE_ENV === 'dev'
    ? require('./config/environments/environment.development').environment
    : require('./config/environments/environment').environment;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: env.frontUrl,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);

  console.log(env);
  console.log(`🚀 Serveur lancé sur : ${env.baseUrl}`);
}
bootstrap();
