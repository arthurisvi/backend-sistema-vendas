import Product from '@modules/products/typeorm/entities/Product';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinColumn } from 'typeorm'
import Order from './Order';

@Entity('orders_products')
export default class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Order, order => order.orderProducts)
  @JoinColumn({name: 'order_id'})
  order: Order

  @ManyToOne(() => Product, product => product.orderProducts)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}