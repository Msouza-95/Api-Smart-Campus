import { Request, Response, Router } from 'express';

const routes = Router();

routes.use('/teste', (request: Request, response: Response) => {
  console.log('router on');
});
export default routes;
