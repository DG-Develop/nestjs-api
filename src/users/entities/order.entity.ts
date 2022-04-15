import { User } from './user.entity';
import { Product } from '../../products/entities/product.entitie';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
