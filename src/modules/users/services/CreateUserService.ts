import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IUser } from "../domain/models/IUser";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ){}

  public async execute({ name, email, password }: IRequest): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email)
    
    if (emailExists) {
      throw new AppError('Já existe um usuário cadastrado com esse email.')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await this.usersRepository.save(user)

    return user;
  }
}