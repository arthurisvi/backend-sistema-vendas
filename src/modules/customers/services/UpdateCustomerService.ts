import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";
import { inject } from "tsyringe";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {

  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository
  ){}

  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findOne(id)

    if (!customer) {
      throw new AppError('Cliente não encontrado.', 404)
    }

    const customerExists = await this.customersRepository.findByEmail(email)

    if (customerExists && email !== customer.email) {
      throw new AppError('Já existe um cliente com este email.')
    }

    customer.name = name
    customer.email = email;
    
    await this.customersRepository.save(customer)

    return customer;
  }
}