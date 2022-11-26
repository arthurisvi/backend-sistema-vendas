import { getCustomRepository } from "typeorm"
import OrdersRepository from "../../orders/typeorm/repositories/OrdersRepository";
import Order from "@modules/orders/typeorm/entities/Order";
import AppError from "@shared/errors/AppError";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";

interface IProduct{
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[]
}

export default class CreateOrderService {

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrdersRepository)
    const productsRepository = getCustomRepository(ProductRepository)
    const customersRepository = getCustomRepository(CustomersRepository)

    const customerExists = await customersRepository.findOne(customer_id)

    if (!customerExists) {
      throw new AppError('Cliente não existente.')
    }

    const existsProducts = await productsRepository.findAllByIds(products)

    if (!existsProducts.length) {
      throw new AppError('Produtos não existentes.')
    }

    const existsProductsIds = existsProducts.map(product => product.id)

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id)
    )

    if (checkInexistentProducts.length) {
      throw new AppError(`Produto ${checkInexistentProducts[0].id} não existe.`)
    }

    const quantityAvailable = products.filter(
      product => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity
    )

    if (quantityAvailable.length) {
      throw new AppError(`Produto ${quantityAvailable[0].id} não tem quantidade disponível.`)
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price
    }))

    const order = await orderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts
    })

    const { orderProducts } = order

    const updatedProductsQuantity = orderProducts.map(product => ({
      id: product.product_id,
      quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
    }))

    await productsRepository.save(updatedProductsQuantity)
    return order;
  }
}