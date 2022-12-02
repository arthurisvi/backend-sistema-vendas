import { getCustomRepository } from "typeorm"
import { Secret, sign } from "jsonwebtoken"
import UserRepository from "../infra/typeorm/repositories/UsersRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import authConfig from "@config/auth";
import { inject, injectable } from "tsyringe";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class LoginService {

  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ){}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Usuário e/ou senha incorretos.', 401)
    }

    const passwordConfirmed = await this.hashProvider.compareHash(password, user.password)

    if (!passwordConfirmed) {
      throw new AppError('Usuário e/ou senha incorretos.', 401)
    }

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    })

    const session: IResponse = {
      user,
      token
    };

    return session;
  }
}