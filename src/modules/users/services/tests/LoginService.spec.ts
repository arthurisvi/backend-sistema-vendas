import 'reflect-metadata'
import InMemoryUsersRepository from "./repositories/InMemoryUsersRepository";
import InMemoryHashProvider from '@modules/users/providers/HashProvider/tests/repositories/InMemoryHashProvider';
import AppError from '@shared/errors/AppError';
import LoginService from '../LoginService';

let usersRepository: InMemoryUsersRepository;
let loginService: LoginService;
let hashProvider: InMemoryHashProvider;

describe('CreateUser', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    hashProvider = new InMemoryHashProvider();
    loginService = new LoginService(usersRepository, hashProvider);
  })

  it('should be able to authenticate', async () => {
    const user = await usersRepository.create({
      name: 'Arthur Isvi',
      email: 'spfcarthur1@gmail.com',
      password: '1234'
    })

    const response = await loginService.execute({
      email: 'spfcarthur1@gmail.com',
      password: '1234'
    })

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  })

  it('should not be able to authenticate with non existent user', async () => {
    expect(
      loginService.execute({
        email: 'spfcarthur1@gmail.com',
        password: '1234'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with incorret password', async () => {
    await usersRepository.create({
      name: 'Arthur Isvi',
      email: 'spfcarthur1@gmail.com',
      password: '1234'
    })

    expect(
      loginService.execute({
        email: 'spfcarthur1@gmail.com',
        password: '123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})