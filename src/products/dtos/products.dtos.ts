import {
  IsNumber,
  IsString,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

/* Hace un mapeo de la clase que se desea copiar todos sus atributos pero estos mismos se vuelven parciales o para mayor entendiemiento
se vuelven atributos opcionales por ejemplo reandonly image?: string */
export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
