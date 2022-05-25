import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany
} from 'typeorm';

import { User } from './user.entity';
import { Order } from './order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  phone: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  updateAt: Date;

  @ApiProperty()
  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
