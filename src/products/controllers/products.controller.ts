import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpStatus,
  HttpCode,
  Res,
  UseGuards
  // ParseIntPipe,
} from '@nestjs/common';

import { Response } from 'express';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { ProductsService } from '../services/products.service';
import {
  CreateProductDTO,
  UpdateProductDTO,
  FilterProductsDTO,
} from '../dtos/products.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from'../../auth/decorators/public.decorator'
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from'../../auth/decorators/roles.decorator'
import { Role } from'../../auth/models/roles.model'


@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  /*  NestJs Utiliza injeccion de dependencias entonces dicho constructor generara una instancia por nosotros */
  constructor(private productService: ProductsService) {}

  /* Rutas con Querys */
  @Public()
  @Get()
  @ApiOperation({ summary: 'List of products ' })
  getProducts(@Query() params: FilterProductsDTO) {
    return this.productService.findAll(params);
  }

  /* Siempre hay que definir la rutas que no son dinamicas de las que si lo son */
  @Get('filter')
  getProductFilter() {
    return {
      message: '`yo soy un filter`',
    };
  }

  /* Rutas con parametros */
  @Public()
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  /* El uso de Pipes nos ayuda a que en la direccion http que se envie por parametro se castee al valor deseado y en caso de no poder
  castearlo se detendra la ejecucion del controlador */
  getProduct(@Param('productId', MongoIdPipe) productId: string) {
    return this.productService.findOne(productId);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDTO) {
    /* return {
      message: 'accion de crear',
      payload,
    }; */
    return this.productService.create(payload);
  }

  @Put(':productId')
  actualizar(
    @Body() payload: UpdateProductDTO,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    // return {
    //   productId,
    //   payload,
    // };
    return this.productService.update(productId, payload);
  }

  @Delete(':productId')
  eliminar(@Param('productId', MongoIdPipe) productId: string) {
    // return {
    //   productId,
    // };
    return this.productService.delete(productId);
  }
}
