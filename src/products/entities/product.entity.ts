import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from './brand.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop({ type: Number, index: true }) //Indexación simple
  @ApiProperty()
  price: number;

  @Prop({ type: Number })
  @Prop()
  @ApiProperty()
  stock: number;

  @Prop()
  @ApiProperty()
  image: string;

  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 }); //Indexación compuesta
