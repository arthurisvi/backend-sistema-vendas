import { IHashProvider } from "../models/IHashProvider";
import { compare, hash } from "bcryptjs" 

export default class BcryptHashProvider implements IHashProvider{
  
  public async generateHash(password: string): Promise<string>{
    return hash(password, 8)
  }

  public async compareHash(password: string, hashed: string): Promise<Boolean>{
    return compare(password, hashed)
  }
}