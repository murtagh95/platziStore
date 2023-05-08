import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // Elimina productos no definidos en el payload
    forbidNonWhitelisted: true  // Si se enbia un dato no decia, devuelve Bad Request
  }));
  await app.listen(port);
  console.info(`Run server in port ${port}`);
}
bootstrap();
