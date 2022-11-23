import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import UserRepository from "../typeorm/repositories/UsersRepository";
import User from "@modules/users/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import authConfig from "@config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class LoginService {

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Usuário e/ou senha incorretos.', 401)
    }

    const passwordConfirmed = await compare(password, user.password)

    if (!passwordConfirmed) {
      throw new AppError('Usuário e/ou senha incorretos.', 401)
    }

    const token = sign({}, authConfig.jwt.secret, {
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