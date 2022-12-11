import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import RoomsController from '../controllers/RoomsController';

const roomsControler = new RoomsController();

const roomsRouter = Router();

roomsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      building_id: Joi.string().required(),
      rooms: Joi.array().required(),
    },
  }),

  roomsControler.create,
);

roomsRouter.get('/', roomsControler.show);

export default roomsRouter;
