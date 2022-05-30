import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* Activando los validadores */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Automaticamente ignora los datos ques estan de maas en el payload y qu eno esten considerados en el dto
      forbidNonWhitelisted: true, //Le avisa al cliente que los datos puestos de mas no son validos
      transformOptions: {
        enableImplicitConversion: true
      }
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('PLATZI STORE')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
