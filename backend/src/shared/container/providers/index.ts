import { container } from 'tsyringe';

import IStorageProvider from './StorageProviders/models/IStorageProvider';
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';

import IMailProvider from './MailProviders/models/IMailProvider';
import EtherealMailProvider from './MailProviders/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailProvider>(
  'MailProvider',
  EtherealMailProvider,
);
