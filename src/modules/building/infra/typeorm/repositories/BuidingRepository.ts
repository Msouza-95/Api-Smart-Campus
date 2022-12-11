import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../../shared/infra/typeorm/AppDataSource';
import { ICreateBuildingDTO } from '../../../dtos/ICreateBuildingDTO';
import IBuindingRepository from '../../../repositories/IBuidingRepository';
import Building from '../entities/Building';

class BuildingRepository implements IBuindingRepository {
  private ormRepositoy: Repository<Building>;

  constructor() {
    this.ormRepositoy = AppDataSource.getRepository(Building);
  }

  async create(data: ICreateBuildingDTO): Promise<Building> {
    const building = this.ormRepositoy.create(data);

    await this.ormRepositoy.save(building);

    return building;
  }

  async findByName(name: string): Promise<Building | null> {
    const findBuilding = await this.ormRepositoy.findOne({ where: { name } });

    return findBuilding;
  }

  async findByAllName(name: string): Promise<Building[]> {
    const findBuilding = await this.ormRepositoy
      .createQueryBuilder('e')
      .where('e.name like :name', { name: `%${name}%` })
      .getMany();

    return findBuilding;
  }
  async findById(building_id: string): Promise<Building | null> {
    const findBuilding = await this.ormRepositoy.findOne({
      where: { id: building_id },
    });

    return findBuilding;
  }
  async listAll(): Promise<Building[]> {
    const buildings = await this.ormRepositoy.find();

    return buildings;
  }
}

export default BuildingRepository;
