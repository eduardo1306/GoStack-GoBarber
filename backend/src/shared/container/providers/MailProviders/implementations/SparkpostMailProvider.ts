import { injectable, inject } from 'tsyringe';
import Sparkpost from 'sparkpost';

import mailConfig from '@config/mail';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class SparkpostMailProvider implements IMailProvider {
  private client: Sparkpost;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = new Sparkpost(process.env.SPARKPOST_API_KEY);
  }

  public async sendMail({
    subject,
    to,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;
    await this.client.transmissions.send({
      options: {
        sandbox: true,
      },
      content: {
        from: {
          email: from?.email || email,
          name: from?.name || name,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      },
      recipients: [
        {
          address: {
            email: to.email,
            name: to.name,
          },
        },
      ],
    });
  }
}
