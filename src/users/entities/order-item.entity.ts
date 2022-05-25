import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';

import { Product } from './../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
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
  @Column({ type: 'int' })
  quantity: number;

  @ApiProperty()
  @ManyToOne(() => Product)
  product: Product;

  @ApiProperty()
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
