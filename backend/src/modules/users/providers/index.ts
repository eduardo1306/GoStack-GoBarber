import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerInstance<IHashProvider>(
  'HashProvider',
  new BCryptHashProvider(),
);
