// import AppError from '@shared/errors/AppError';
import ListProvidersMonthsAvaliabilityService from './ListProvidersMonthsAvaliabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProvidersMonthsAvaliability: ListProvidersMonthsAvaliabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersMonthsAvaliability = new ListProvidersMonthsAvaliabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list providers months avaliability', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 8, 0, 0),
      provider_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 9, 0, 0),
      provider_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 10, 0, 0),
      provider_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 11, 0, 0),
      provider_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 12, 0, 0),
      provider_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 13, 0, 0),
      provider_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 14, 0, 0),
      provider_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 15, 0, 0),
      provider_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 16, 0, 0),
      provider_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 17, 0, 0),
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 4, 0, 0),
      provider_id: 'user',
    });

    const avaliability = await listProvidersMonthsAvaliability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(avaliability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
