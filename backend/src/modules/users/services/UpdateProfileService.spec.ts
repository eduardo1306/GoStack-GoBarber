import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Wick',
      email: 'johnwick@example.com',
    });

    expect(updatedUser.name).toBe('John Wick');
    expect(updatedUser.email).toBe('johnwick@example.com');
  });
  it('should not be able to change to another user email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
    });

    await fakeUsersRepository.create({
      name: 'John Wick',
      password: '123456',
      email: 'johnwick@example.com',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Wick',
        email: 'johnwick@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Wick',
      email: 'johnwick@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Wick',
        email: 'johnwick@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Wick',
        email: 'johnwick@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to show the non-existing user', async () => {
    await expect(
      updateProfile.execute({
        email: 'non-existing-user@example.com',
        name: 'non-existing-user',
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
