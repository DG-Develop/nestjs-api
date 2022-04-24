import {
  IsNumber,
  IsString,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

/* Hace un mapeo de la clase que se desea copiar todos sus atributos pero estos mismos se vuelven parciales o para mayor entendiemiento
se vuelven atributos opcionales por ejemplo reandonly image?: string */
export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class FilterProductsDTO {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
