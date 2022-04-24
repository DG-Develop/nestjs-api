import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop({ type: Number })
  @ApiProperty()
  price: number;

  @Prop({ type: Number })
  @Prop()
  @ApiProperty()
  stock: number;

  @Prop()
  @ApiProperty()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
