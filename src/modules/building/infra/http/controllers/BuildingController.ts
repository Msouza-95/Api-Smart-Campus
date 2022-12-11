import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBuildingService from '../../../services/CreateBuildingService';
import ShowBuildingService from '../../../services/ShowBuildingService';

class BuildingController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, longitude, latitude } = req.body;

    const createBuildingService = container.resolve(CreateBuildingService);

    const building = await createBuildingService.execute({
      name,
      longitude,
      latitude,
    });

    return res.status(201).json({ building });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const showBuildingService = container.resolve(ShowBuildingService);

    const building = await showBuildingService.execute();

    return res.status(201).json({ building });
  }
  public async read(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const showBuildingService = container.resolve(ShowBuildingService);
    console.log(name);
    const building = await showBuildingService.execute(name);

    return res.status(201).json({ building });
  }
}
export default BuildingController;
