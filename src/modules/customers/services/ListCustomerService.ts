import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { inject } from "tsyringe";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";

export default class ListCustomerService {

  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository
  ) { }

  public async execute(): Promise<Customer[]> {
    const customers = await this.customersRepository.findAll()

    return customers
  }

}