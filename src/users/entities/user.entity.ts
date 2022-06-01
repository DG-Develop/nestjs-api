import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty()
  @Exclude()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({ required: true })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
