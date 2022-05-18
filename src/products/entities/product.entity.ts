import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Brand } from './brand.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @ApiProperty()
  name: string;

  @Column({ type: 'text' })
  @ApiProperty()
  description: string;

  @Column({ type: 'int' })
  @ApiProperty()
  price: number;

  @Column({ type: 'int' })
  @ApiProperty()
  stock: number;

  @Column({ type: 'varchar' })
  @ApiProperty()
  image: string;

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
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand
}
