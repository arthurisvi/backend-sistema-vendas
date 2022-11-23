import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repositories/UsersRepository";
import User from "@modules/users/typeorm/entities/User";

export default class ListUserService {

  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository)

    const users = await userRepository.find()

    return users
  }

}