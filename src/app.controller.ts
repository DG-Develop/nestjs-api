import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new')
  newEndPoint() {
    return 'Yo soy nuevo';
  }

  /* No importa si tiene slash o no nestjs lo resulve */
  @Get('/ruta/')
  @Public()
  hello() {
    return 'con /sas/';
  }

  @Get('/tasks')
  tasks() {
    return this.appService.getTasks()
  }
}
