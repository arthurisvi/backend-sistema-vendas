import { getCustomRepository } from "typeorm"
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

export default class ShowCustomerService {

  public async execute({ id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const customer = await customersRepository.findOne(id)

    if (!customer) {
      throw new AppError('Cliente não encontrado.', 404)
    }

    return customer;
  }

}