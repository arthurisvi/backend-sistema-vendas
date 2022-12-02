import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICustomer } from "../domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

interface IRequest {
  id: string;
}

@injectable()
export default class ShowCustomerService {

  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) { }

  public async execute({ id }: IRequest): Promise<ICustomer> {
    const customer = await this.customersRepository.findOne(id)

    if (!customer) {
      throw new AppError('Cliente não encontrado.', 404)
    }

    return customer;
  }

}