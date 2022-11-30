import { getCustomRepository } from "typeorm"
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository)

    const emailExists = await customerRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Já existe um cliente cadastrado com esse email.')
    }

    const customer: Customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer)

    return customer;
  }
}