import { getCustomRepository } from "typeorm"
import OrdersRepository from "../../orders/infra/typeorm/repositories/OrdersRepository";
import Order from "@modules/orders/infra/typeorm/entities/Order";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

export default class ShowOrderService {

  public async execute({ id }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrdersRepository)

    const order = await orderRepository.findById(id)

    if (!order) {
      throw new AppError('Pedido não encontrado.')
    }

    return order;
  }
}