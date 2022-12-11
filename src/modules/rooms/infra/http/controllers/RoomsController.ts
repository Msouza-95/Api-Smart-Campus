import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRoomsService from '../../../services/CreateRoomsService';
import ShowRoomsService from '../../../services/ShowRoomsService';

class RoomsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { building_id, rooms } = req.body;

    const createRoomsService = container.resolve(CreateRoomsService);

    const newRooms = await createRoomsService.execute({
      building_id,
      rooms,
    });

    return res.status(201).json({ newRooms });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const showRoomsService = container.resolve(ShowRoomsService);

    const rooms = await showRoomsService.execute();

    return res.status(201).json({ rooms });
  }
}
export default RoomsController;
