import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Customer } from './customer.entity';

@Entity()
export class User {
  @PrimaryColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  password: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  role: string;

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

  // La relación uno uno debe de hacerse de un solo lado con el decorador JoinColumn
  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn()
  customer: Customer;
}
