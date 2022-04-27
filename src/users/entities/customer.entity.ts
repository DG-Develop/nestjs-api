import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Customer extends Document {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  lastName: string;

  @ApiProperty()
  @Prop()
  phone: string;

  @Prop({ type: [{ name: { type: String }, color: { type: String } }] })
  skills: Types.Array<Record<string, any>>;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
