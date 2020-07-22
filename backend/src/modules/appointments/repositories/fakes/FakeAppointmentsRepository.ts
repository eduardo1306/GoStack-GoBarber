import { uuid } from 'uuidv4';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmensRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      date,
      provider_id,
    });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.date === date,
    );

    return findAppointment;
  }
}

export default FakeAppointmentsRepository;
