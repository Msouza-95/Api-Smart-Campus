import { inject, injectable } from 'tsyringe';

import { ICreateBuildingDTO } from '../dtos/ICreateBuildingDTO';
import Building from '../infra/typeorm/entities/Building';
import IBuindingRepository from '../repositories/IBuidingRepository';

@injectable()
class CreateBuildingService {
  constructor(
    @inject('BuildingRepository')
    private buildingRepository: IBuindingRepository,
  ) {}

  async execute({
    name,
    latitude,
    longitude,
  }: ICreateBuildingDTO): Promise<Building> {
    const building = await this.buildingRepository.findByName(name);
    const newName = name.toLocaleLowerCase();

    console.log(newName);

    if (building) {
      throw new Error('Building already exist');
    }

    const newBuilding = await this.buildingRepository.create({
      name: newName,
      latitude,
      longitude,
    });

    return newBuilding;
  }
}

export default CreateBuildingService;
