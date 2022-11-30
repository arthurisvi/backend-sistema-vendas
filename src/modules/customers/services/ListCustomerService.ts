import { getCustomRepository } from "typeorm"
import CustomerRepository from "../infra/typeorm/repositories/CustomersRepository";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";

export default class ListCustomerService {

  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomerRepository)

    const customers = await customerRepository.find()

    return customers
  }

}