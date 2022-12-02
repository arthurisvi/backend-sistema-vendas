import AppError from "@shared/errors/AppError";
import { inject } from "tsyringe";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";

interface IRequest {
  id: string;
}

export default class DeleteCustomerService {

  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository
  ) { }

  public async execute({ id }: IRequest): Promise<void> {
    const customer = await this.customersRepository.findOne(id)

    if (!customer) {
      throw new AppError('Cliente não encontrado.', 404)
    }

    await this.customersRepository.remove(customer)
  }

}