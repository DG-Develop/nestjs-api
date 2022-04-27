import {
  IsNumber,
  IsString,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
  IsArray
} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateCategoryDto } from './category.dto'
import { CreateSubDocDto } from './sub-doc.dto';
import { Type } from 'class-transformer';

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

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  readonly category: CreateCategoryDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly brand: string;

  @IsNotEmpty()
  @ValidateNested()
  readonly subDoc: CreateSubDocDto;  // 👈 1:1

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDocDto)
  readonly subDocs: CreateSubDocDto[]
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

  @IsOptional()
  @Min(0)
  minPrice: number;

  // Con el validateIf verificamos si existe el parametro minPrice entonces este campo se vuelve obligatorio
  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
