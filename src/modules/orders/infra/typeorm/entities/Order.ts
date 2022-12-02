import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import OrderProduct from './OrderProduct';

@Entity('orders')
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer

  @OneToMany(() => OrderProduct,
    orderProducts => orderProducts.order,
    { cascade: true })
  orderProducts: OrderProduct[]

  @CreateDateColumn('')
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}