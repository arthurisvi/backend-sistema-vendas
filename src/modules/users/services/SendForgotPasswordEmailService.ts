import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {

  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository)
    const userTokensRepository = getCustomRepository(UserTokensRepository)

    const user = await userRepository.findByEmail(email)

    if (!user) {
      throw new AppError("Usuário não existe.")  
    }

    const token = await userTokensRepository.generate(user.id)

    console.log(token)
  }
}