import { getCustomRepository } from "typeorm"
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {

  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository)

    const customer = await customerRepository.findOne(id)

    if (!customer) {
      throw new AppError('Cliente não encontrado.', 404)
    }

    const customerExists = await customerRepository.findByEmail(email)

    if (customerExists && email !== customer.email) {
      throw new AppError('Já existe um cliente com este email.')
    }

    customerRepository.merge(customer, { name, email })

    await customerRepository.save(customer)

    return customer;
  }
}