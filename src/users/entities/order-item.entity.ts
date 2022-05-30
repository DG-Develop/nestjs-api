import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';

import { Exclude } from 'class-transformer'

import { Product } from './../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
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
