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
  // ParseIntPipe,
} from '@nestjs/common';

import { Response } from 'express';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { ProductsService } from '../services/products.service';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dtos';

@Controller('products')
export class ProductsController {
  /*  NestJs Utiliza injeccion de dependencias entonces dicho constructor generara una instancia por nosotros */
  constructor(private productService: ProductsService) {}

  /* Rutas con Querys */
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    /* return {
      message: `products: limit => ${limit} offset => ${offset} brand => ${brand}`,
    }; */

    return this.productService.findAll();
  }

  /* Siempre hay que definir la rutas que no son dinamicas de las que si lo son */
  @Get('filter')
  getProductFilter() {
    return {
      message: '`yo soy un filter`',
    };
  }

  /* Rutas con parametros */
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  /* El uso de Pipes nos ayuda a que en la direccion http que se envie por parametro se castee al valor deseado y en caso de no poder
  castearlo se detendra la ejecucion del controlador */
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    /* response.status(200).json({
      message: `product ${productId}`,
    }); */

    return this.productService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDTO) {
    /* return {
      message: 'accion de crear',
      payload,
    }; */
    return this.productService.create(payload);
  }

  @Put(':productId')
  actualizar(@Body() payload: UpdateProductDTO, @Param('productId') productId: string) {
    // return {
    //   productId,
    //   payload,
    // };
    return this.productService.update(parseInt(productId), payload);
  }

  @Delete(':productId')
  eliminar(@Param('productId') productId: string) {
    // return {
    //   productId,
    // };
    return this.productService.delete(parseInt(productId));
  }
}
