import { getCustomRepository } from "typeorm"
import { isAfter, addHours } from "date-fns"
import { hash } from "bcryptjs"
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import AppError from "@shared/errors/AppError";
import UserRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {

  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository)
    const userTokensRepository = getCustomRepository(UserTokensRepository)

    const userToken = await userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError("Token de usuário não existe.")
    }

    const user = await userRepository.findOne(userToken.user_id)

    if (!user) {
      throw new AppError("Usuário não existe.")
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expirado.")
    }

    user.password = await hash(password, 8)
    
    userRepository.save(user)
  }
}