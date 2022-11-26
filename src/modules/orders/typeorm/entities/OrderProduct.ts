import Product from '@modules/products/typeorm/entities/Product';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinColumn } from 'typeorm'
import Order from './Order';

@Entity('orders_products')
export default class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @Column()
  customer_id: string;

  @ManyToOne(() => Order, order => order.orderProducts)
  @JoinColumn({name: 'order_id'})
  order: Order

  @ManyToOne(() => Product, product => product.orderProducts)
  @JoinColumn({ name: 'order_id' })
  product: Product

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}