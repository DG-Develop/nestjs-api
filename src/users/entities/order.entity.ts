import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

import { Customer } from './customer.entity';

@Schema()
export class Order extends Document {
  @ApiProperty()
  @Prop({ type: Date })
  date: Date;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Customer | Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
