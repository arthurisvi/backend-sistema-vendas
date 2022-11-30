import AppError from "@shared/errors/AppError";
import { ICustomer } from "../domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {

  constructor(private customersRepository: ICustomersRepository) {
    this.customersRepository = customersRepository;
  }

  public async execute({ name, email }: IRequest): Promise<ICustomer> {

    const emailExists = await this.customersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Já existe um cliente cadastrado com esse email.')
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}