import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* Activando los validadores */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Automaticamente ignora los datos ques estan de maas en el payload y qu eno esten considerados en el dto
      forbidNonWhitelisted: true, //Le avisa al cliente que los datos puestos de mas no son validos
    }),
  );
  await app.listen(3000);
}
bootstrap();
