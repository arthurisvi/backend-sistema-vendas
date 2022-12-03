import 'reflect-metadata'
import CreateUserService from "../CreateUserService";
import InMemoryUsersRepository from "./repositories/InMemoryUsersRepository";
import InMemoryHashProvider from '@modules/users/providers/HashProvider/tests/repositories/InMemoryHashProvider';
import AppError from '@shared/errors/AppError';

let usersRepository: InMemoryUsersRepository;
let createUserService: CreateUserService;
let hashProvider: InMemoryHashProvider;

describe('CreateUser', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    hashProvider = new InMemoryHashProvider();
    createUserService = new CreateUserService(usersRepository, hashProvider);
  })

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Arthur Isvi',
      email: 'spfcarthur1@gmail.com',
      password: '1234'
    })

    expect(user).toHaveProperty('id');
  })

  it('should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'Isvi Arthur',
      email: 'spfcarthur1@gmail.com',
      password: '1234'
    })

    expect(
      createUserService.execute({
        name: 'Fulano Teste',
        email: 'spfcarthur1@gmail.com',
        password: '1234'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})