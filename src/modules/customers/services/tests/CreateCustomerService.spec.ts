import 'reflect-metadata'
import CreateCustomerService from "../CreateCustomerService";
import InMemoryCustomersRepository from "./repositories/InMemoryCustomersRepository";
import AppError from '@shared/errors/AppError';

describe('CreateCustomer', () => {
  it('should be able to create a new customer', async () => {
    const customersRepository = new InMemoryCustomersRepository();
    const createCustomerService = new CreateCustomerService(customersRepository);

    const customer = await createCustomerService.execute({
      name: 'Arthur Isvi',
      email: 'spfcarthur1@gmail.com'
    })

    expect(customer).toHaveProperty('id');
  })

  it('should be able to create a new customer', async () => {
    const customersRepository = new InMemoryCustomersRepository();
    const createCustomerService = new CreateCustomerService(customersRepository);

    await createCustomerService.execute({
      name: 'Arthur Isvi',
      email: 'spfcarthur1@gmail.com'
    })

    expect(createCustomerService.execute({
      name: 'Fulano',
      email: 'spfcarthur1@gmail.com'
    })).rejects.toBeInstanceOf(AppError);

  })
})