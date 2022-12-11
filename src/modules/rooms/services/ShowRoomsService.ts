import { inject, injectable } from 'tsyringe';

import Rooms from '../infra/typeorm/entities/Rooms';
import { IRoomsRepository } from '../repositories/IRoomsRepository';

@injectable()
class ShowRoomsService {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {}

  async execute(): Promise<Rooms[]> {
    const rooms = await this.roomsRepository.listAll();

    return rooms;
  }
}
export default ShowRoomsService;
