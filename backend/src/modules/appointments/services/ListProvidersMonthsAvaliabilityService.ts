import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmensRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProvidersMonthsAvaliabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id,
      month,
      year,
    });

    return [{ day: 1, available: false }];
  }
}

export default ListProvidersMonthsAvaliabilityService;
