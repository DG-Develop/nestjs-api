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

} from '@nestjs/common';

import { response, Response } from 'express'

@Controller('products')
export class ProductsController {
  /* Rutas con Querys */
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `products: limit => ${limit} offset => ${offset} brand => ${brand}`,
    };
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
  getProduct(@Res() response: Response, @Param('productId') productId: string) {
    response.status(200).json({
      message: `product ${productId}`,
    });
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'accion de crear',
      payload,
    };
  }

  @Put(':productId')
  actualizar(@Body() payload: any, @Param('productId') productId: number) {
    return {
      productId,
      payload,
    };
  }

  @Delete(':productId')
  eliminar(@Param('productId') productId: number) {
    return {
      productId,
    };
  }
}
