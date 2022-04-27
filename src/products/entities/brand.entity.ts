import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Brand extends Document {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  @ApiProperty()
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
