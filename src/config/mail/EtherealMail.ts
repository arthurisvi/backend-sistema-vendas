import nodemailer from 'nodemailer'

interface ISendMail{
  to: string;
  body: string
}

export default class EtherailMail{
  public static async sendMail({ to, body }: ISendMail): Promise<void>{
    const account = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    })

    const message = await transporter.sendMail({
      from: 'contact@apivendas.com',
      to,
      subject: 'Recuperação de senha',
      text: body
    })

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));

  }
}