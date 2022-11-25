import { getCustomRepository } from "typeorm"
import CustomerRepository from "../typeorm/repositories/CustomersRepository";
import Customer from "@modules/customers/typeorm/entities/Customer";

export default class ListCustomerService {

  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomerRepository)

    const customers = await customerRepository.find()

    return customers
  }

}