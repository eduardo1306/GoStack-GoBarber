import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProviders/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordService from './SendForgotPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordService;
let fakeUserTokensRepository: FakeUserTokensRepository;

describe('Send Forgot Password', () => {
  beforeAll(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });
  it('should be able to recover the user password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@test.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a password for unauthorizated user ', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@test.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
