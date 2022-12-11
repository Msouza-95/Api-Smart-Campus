import { inject, injectable } from 'tsyringe';

import IBuindingRepository from '../../building/repositories/IBuidingRepository';
import { ICreateRoomsDTO } from '../dtos/ICreateRoomsDTO';
import Rooms from '../infra/typeorm/entities/Rooms';
import { IRoomsRepository } from '../repositories/IRoomsRepository';

interface IName {
  name: string;
}
interface IRequest {
  building_id: string;
  rooms: IName[];
}
interface IResponse {
  building_id?: string;
  rooms: IName[];
}
@injectable()
class CreateRoomsService {
  private roomsResponse: Array<Rooms>;
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,
    @inject('BuildingRepository')
    private buildingRepository: IBuindingRepository,
  ) {
    this.roomsResponse = [];
  }

  async execute({ building_id, rooms }: IRequest): Promise<Rooms[]> {
    const building = await this.buildingRepository.findById(building_id);
    if (!building) {
      throw new Error('Building_id Not exist');
    }

    const promises = rooms.map(async item => {
      const name = item.name.toLocaleLowerCase();
      const findRooms = await this.roomsRepository.findByName(name);

      if (!findRooms) {
        const addRomms = await this.roomsRepository.create({
          building_id,
          name,
        });
        this.roomsResponse.push(addRomms);
      }
    });

    await Promise.all(promises);

    return this.roomsResponse;
  }
}
export default CreateRoomsService;
