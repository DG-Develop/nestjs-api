import { IsString, IsNotEmpty, IsEmail, Length, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'the email of user' })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly role: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
