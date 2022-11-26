import OrderProduct from '@modules/orders/typeorm/entities/OrderProduct';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'

@Entity('products')
export default class Product{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @OneToMany(() => OrderProduct, orderProducts => orderProducts.order)
  orderProducts: OrderProduct[]

  @CreateDateColumn('')
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}