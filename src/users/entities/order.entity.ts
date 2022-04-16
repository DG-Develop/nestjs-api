import { User } from './user.entity';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty()
  date: Date;
  @ApiProperty()
  user: User;
  @ApiProperty()
  products: Product[];
}
