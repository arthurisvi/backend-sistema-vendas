import { getCustomRepository } from "typeorm"
import UserRepository from "../infra/typeorm/repositories/UsersRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {

  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ){}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)

    const emailExists = await userRepository.findByEmail(email)
    
    console.log(emailExists)

    if (emailExists) {
      throw new AppError('Já existe um usuário cadastrado com esse email.')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user: User = userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await userRepository.save(user)

    return user;
  }
}