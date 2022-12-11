import { container } from 'tsyringe';

import BuildingRepository from '../../../modules/building/infra/typeorm/repositories/BuidingRepository';
import IBuindingRepository from '../../../modules/building/repositories/IBuidingRepository';
import RoomsRepository from '../../../modules/rooms/infra/typeorm/repositories/RoomsRepository';
import { IRoomsRepository } from '../../../modules/rooms/repositories/IRoomsRepository';

container.registerSingleton<IBuindingRepository>(
  'BuildingRepository',
  BuildingRepository,
);
container.registerSingleton<IRoomsRepository>(
  'RoomsRepository',
  RoomsRepository,
);
