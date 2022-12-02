import 'reflect-metadata'
import CreateCustomerService from "../CreateCustomerService";
import InMemoryCustomersRepository from "./repositories/InMemoryCustomersRepository";
import AppError from '@shared/errors/AppError';

let customersRepository: InMemoryCustomersRepository;
let createCustomerService: CreateCustomerService;

describe('CreateCustomer', () => {

  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository();
    createCustomerService = new CreateCustomerService(customersRepository);
  })

  it('should be able to create a new customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'Arthur Isvi',
      email: 'spfcarthur1@gmail.com'
    })

    expect(customer).toHaveProperty('id');
  })

  it('should be able to create a new customer', async () => {
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