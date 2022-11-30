import { getRepository, Repository } from "typeorm";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import Customer from "../entities/Customer";
import { ICreateCustomerDTO } from "@modules/customers/domain/models/ICreateCustomerDTO";
export default class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>

  constructor() {
    this.ormRepository = getRepository(Customer)
  }

  public async create({ name, email }: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      email,
    });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer>{
    return this.ormRepository.save(customer);
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: { name },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: { email },
    });

    return customer;
  }
}