import { inject, injectable } from 'tsyringe';

import { IRoomsRepository } from '../../rooms/repositories/IRoomsRepository';
import Building from '../infra/typeorm/entities/Building';
import IBuindingRepository from '../repositories/IBuidingRepository';

@injectable()
class ShowBuildingService {
  constructor(
    @inject('BuildingRepository')
    private buildingRepository: IBuindingRepository,
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {}

  async execute(name?: string): Promise<Building[]> {
    if (!name) {
      const building = await this.buildingRepository.listAll();

      return building;
    }

    const building = await this.buildingRepository.findByAllName(name);

    // caso não encontra nenhum building realizar busca com rooms
    if (building.length > 0) return building;

    const rooms = await this.roomsRepository.findByAllName(name);

    if (rooms.length === 0) return building;

    const buildingTwo: Array<Building> = [];

    const promises = rooms.map(async item => {
      const building = await this.buildingRepository.findById(item.building_id);
      if (building) {
        const valid = buildingTwo.find(item => {
          return item.id === building.id;
        });

        if (!valid) {
          buildingTwo.push(building);
        }
      }
    });

    await Promise.all(promises);

    console.log(buildingTwo);

    return buildingTwo;
  }
}

export default ShowBuildingService;
