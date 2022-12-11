import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Building from '../infra/typeorm/entities/Building';
import IBuindingRepository from '../repositories/IBuidingRepository';

@injectable()
class ShowBuildingService {
  constructor(
    @inject('BuildingRepository')
    private buildingRepository: IBuindingRepository,
  ) {}

  async execute(name?: string): Promise<Building[]> {
    if (!name) {
      const building = await this.buildingRepository.listAll();

      return building;
    }

    const building = await this.buildingRepository.findByAllName(name);

    return building;
  }
}

export default ShowBuildingService;
