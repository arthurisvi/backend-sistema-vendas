import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";
import { inject } from "tsyringe";

interface IRequest {
  id: string;
}

export default class ShowCustomerService {

  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository
  ) { }

  public async execute({ id }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findOne(id)

    if (!customer) {
      throw new AppError('Cliente não encontrado.', 404)
    }

    return customer;
  }

}