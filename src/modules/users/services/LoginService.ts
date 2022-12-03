import { Secret, sign } from "jsonwebtoken"
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import authConfig from "@config/auth";
import { inject, injectable } from "tsyringe";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";

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
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ){}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

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