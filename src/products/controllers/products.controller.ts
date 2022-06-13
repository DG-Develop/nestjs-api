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
  ParseIntPipe,
  UseGuards
  // ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from '../services/products.service';
import {
  CreateProductDTO,
  FilterProductsDto,
  UpdateProductDTO,
} from '../dtos/products.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from'../../auth/decorators/public.decorator'
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
  getProducts(@Query() params: FilterProductsDto) {
    /* return {
      message: `products: limit => ${limit} offset => ${offset} brand => ${brand}`,
    }; */

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
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    /* response.status(200).json({
      message: `product ${productId}`,
    }); */

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
    @Param('productId') productId: number,
  ) {
    // return {
    //   productId,
    //   payload,
    // };
    return this.productService.update(productId, payload);
  }

  @Put(':productId/category/:categoryId')
  addCategoryToProduct(
    @Param('productId') productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    // return {
    //   productId,
    //   payload,
    // };
    return this.productService.addCategoryToProduct(productId, categoryId);
  }

  @Delete(':productId')
  eliminar(@Param('productId') productId: number) {
    // return {
    //   productId,
    // };
    return this.productService.delete(productId);
  }

  @Delete(':productId/category/:categoryId')
  deleteCatetory(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productService.removeCategoryByProduct(productId, categoryId);
  }
}
