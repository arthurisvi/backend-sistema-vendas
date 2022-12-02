import { getCustomRepository } from "typeorm"
import { hash } from "bcryptjs"
import UserRepository from "../infra/typeorm/repositories/UsersRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)

    const emailExists = await userRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Já existe um usuário cadastrado com esse email.')
    }

    const hashedPassword = await hash(password, 8)

    const user: User = userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await userRepository.save(user)

    return user;
  }
}