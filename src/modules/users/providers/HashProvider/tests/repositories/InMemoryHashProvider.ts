import { IHashProvider } from "../../models/IHashProvider";

export default class InMemoryHashProvider implements IHashProvider {

  public async generateHash(password: string): Promise<string> {
    return password;
  }

  public async compareHash(password: string, hashed: string): Promise<Boolean> {
    return password === hashed;
  }
}