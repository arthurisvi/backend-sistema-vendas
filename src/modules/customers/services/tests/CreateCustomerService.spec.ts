import 'reflect-metadata'
import CreateCustomerService from "../CreateCustomerService";
import InMemoryCustomersRepository from "./repositories/InMemoryCustomersRepository";

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
})