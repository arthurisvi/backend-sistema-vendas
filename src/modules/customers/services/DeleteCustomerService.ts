import { getCustomRepository } from "typeorm"
import CustomerRepository from "../typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

export default class DeleteCustomerService {

  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository)

    const customer = await customerRepository.findOne(id)

    if (!customer) {
      throw new AppError('Cliente não encontrado.', 404)
    }

    await customerRepository.remove(customer)
  }

}