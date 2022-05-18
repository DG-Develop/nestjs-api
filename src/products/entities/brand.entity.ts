
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { ApiProperty } from "@nestjs/swagger";
import { Product } from './product.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @ApiProperty()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  image: string;

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
  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
