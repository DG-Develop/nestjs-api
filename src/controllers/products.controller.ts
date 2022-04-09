import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  /* Rutas con Querys */
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `products: limit => ${limit} offset => ${offset} brand => ${brand}`;
  }

  /* Siempre hay que definir la rutas que no son dinamicas de las que si lo son */
  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  /* Rutas con parametros */
  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return `product ${productId}`;
  }
}
