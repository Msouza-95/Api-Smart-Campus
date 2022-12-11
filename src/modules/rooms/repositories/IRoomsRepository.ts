import { ICreateRoomsDTO } from '../dtos/ICreateRoomsDTO';
import Rooms from '../infra/typeorm/entities/Rooms';

export interface IRoomsRepository {
  create(data: ICreateRoomsDTO): Promise<Rooms>;
  findByName(name: string): Promise<Rooms | null>;
  findByAllName(name: string): Promise<Rooms[]>;
  listAll(): Promise<Rooms[]>;
}
