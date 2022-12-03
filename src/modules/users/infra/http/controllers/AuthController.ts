import { Request, Response } from 'express'
import { container } from 'tsyringe';
import LoginService from '../../../services/LoginService';
import { instanceToInstance } from 'class-transformer';
export default class AuthController{

  public async create(request: Request, response: Response): Promise<Response>{
    const { email, password } = request.body;

    const loginService = container.resolve(LoginService);

    const session = await loginService.execute({ email, password })

    return response.json(instanceToInstance(session))
  }

}