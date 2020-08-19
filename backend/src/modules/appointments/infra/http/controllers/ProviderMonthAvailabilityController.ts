import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProviderMonthsAvailabilityService from '@modules/appointments/services/ListProviderMonthsAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthsAvailabilityService,
    );

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      year,
      month,
    });

    return response.json(availability);
  }
}
