import { container } from 'tsyringe';

import mailConfig from '@config/mail';
import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import SparkpostMailProvider from './implementations/SparkpostMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  sparkpost: container.resolve(SparkpostMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
