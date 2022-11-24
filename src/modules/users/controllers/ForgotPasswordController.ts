import { Request, Response } from 'express'
import LoginService from '../services/LoginService';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {

  public async store(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService()

    await sendForgotPasswordEmail.execute({ email })

    return response.status(204).json({ message: "Email enviado com sucesso." })
  }

}