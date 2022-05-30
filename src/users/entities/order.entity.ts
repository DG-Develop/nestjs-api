import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Entity,
  OneToMany,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ApiProperty()
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @Exclude()
  @ApiProperty()
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Expose()
  get products() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .map((item) => ({
          ...item.product,
          quantity: item.quantity,
          itemId: item.id
        }));
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .reduce((total, item) => {
          const totalItem = item.product.price * item.quantity;
          return total + totalItem;
        }, 0);
    }
    return 0;
  }
}
