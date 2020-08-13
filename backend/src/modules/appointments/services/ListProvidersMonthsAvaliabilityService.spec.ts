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
      date: new Date(2020, 3, 20, 8, 0, 0),
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 8, 0, 0),
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 6, 0, 0),
      provider_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 4, 0, 0),
      provider_id: 'user',
    });

    const avaliability = await listProvidersMonthsAvaliability.execute({
      year: 2020,
      month: 5,
      provider_id: 'user',
    });

    expect(avaliability).toEqual(
      expect.arrayContaining([
        { day: 19, avaliable: true },
        { day: 20, avaliable: false },
        { day: 21, avaliable: false },
        { day: 22, avaliable: true },
      ]),
    );
  });
});
