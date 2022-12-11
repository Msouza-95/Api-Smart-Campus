import { ICreateBuildingDTO } from '../dtos/ICreateBuildingDTO';
import Building from '../infra/typeorm/entities/Building';

export default interface IBuindingRepository {
  create(data: ICreateBuildingDTO): Promise<Building>;
  findByName(name: string): Promise<Building | null>;
  findByAllName(name: string): Promise<Building[]>;
  findById(building_id: string): Promise<Building | null>;
  listAll(): Promise<Building[]>;
}
