import { Like, Repository } from 'typeorm';

import { ICreateRoomsDTO } from '@modules/rooms/dtos/ICreateRoomsDTO';

import { AppDataSource } from '../../../../../shared/infra/typeorm/AppDataSource';
import { IRoomsRepository } from '../../../repositories/IRoomsRepository';
import Rooms from '../entities/Rooms';

class RoomsRepository implements IRoomsRepository {
  private ormRepositoy: Repository<Rooms>;

  constructor() {
    this.ormRepositoy = AppDataSource.getRepository(Rooms);
  }

  async create(data: ICreateRoomsDTO): Promise<Rooms> {
    const rooms = this.ormRepositoy.create(data);

    await this.ormRepositoy.save(rooms);

    return rooms;
  }
  async findByName(name: string): Promise<Rooms | null> {
    const rooms = await this.ormRepositoy.findOne({
      where: { name: Like(name) },
    });

    return rooms;
  }
  async findByAllName(name: string): Promise<Rooms[]> {
    const rooms = await this.ormRepositoy.find({
      where: {
        name: Like(`%${name}%`),
      },
    });

    return rooms;
  }

  async listAll(): Promise<Rooms[]> {
    const rooms = await this.ormRepositoy.find();

    return rooms;
  }
}

export default RoomsRepository;
