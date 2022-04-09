import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola Mundo!!!!!';
  }

  @Get('new')
  newEndPoint() {
    return 'Yo soy nuevo';
  }

  /* No importa si tiene slash o no nestjs lo resulve */
  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }
}
