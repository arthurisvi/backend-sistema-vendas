import { ICreateCustomerDTO } from "../models/ICreateCustomerDTO";
import { ICustomer } from "../models/ICustomer";

export interface ICustomersRepository {
  create(data: ICreateCustomerDTO): Promise<ICustomer>;
  // save(customer: ICustomer): Promise<ICustomer>;
  findByName(name: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  // findOne()
}