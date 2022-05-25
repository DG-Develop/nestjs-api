import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Entity,
  OneToMany,
} from 'typeorm';

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

  @ApiProperty()
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
