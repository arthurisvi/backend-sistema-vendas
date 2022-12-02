import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICustomer } from "../domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

@injectable()
export default class UpdateCustomerService {

  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ){}

  public async execute({ id, name, email }: IRequest): Promise<ICustomer> {
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