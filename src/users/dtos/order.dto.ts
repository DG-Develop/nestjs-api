import { IsMongoId, IsNotEmpty, IsDate, IsArray } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
