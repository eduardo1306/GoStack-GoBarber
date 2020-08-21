import ICreateNotificationsDTO from '../dtos/ICreateNotificationsDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationRepository {
  create(date: ICreateNotificationsDTO): Promise<Notification>;
}
