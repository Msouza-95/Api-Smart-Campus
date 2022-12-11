import { Router } from 'express';

import buildingRouter from '../../../../modules/building/infra/http/routes/building.routes';
import roomsRouter from '../../../../modules/rooms/infra/http/routes/rooms.routes';

const routes = Router();

routes.use('/building', buildingRouter);
routes.use('/rooms', roomsRouter);

export default routes;
