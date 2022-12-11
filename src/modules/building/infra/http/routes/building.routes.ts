import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import BuildingController from '../controllers/BuildingController';

const buildingControler = new BuildingController();

const buildingRouter = Router();

buildingRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  }),

  buildingControler.create,
);

buildingRouter.get('/', buildingControler.show);
buildingRouter.get('/:name', buildingControler.read);
export default buildingRouter;
