import { v4 as uuid } from 'uuid'
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { ICreateCustomerDTO } from "@modules/customers/domain/models/ICreateCustomerDTO";

export default class InMemoryCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer()

    customer.id = uuid();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(findCustomer => findCustomer.id === customer.id);
    
    this.customers[findIndex] = customer;

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
  }

  public async findAll(): Promise<Customer[] | undefined> {
    return undefined;
  }

  public async findOne(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id)

    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    
    return customer;
  }
}