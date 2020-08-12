// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Wick',
      password: '123123',
      email: 'johnwick@example.com',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Bonham',
      password: '123123',
      email: 'johnbonham@example.com',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
