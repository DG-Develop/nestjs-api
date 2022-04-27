import { IsString, IsNotEmpty, IsPhoneNumber, IsArray } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly skills: any;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
