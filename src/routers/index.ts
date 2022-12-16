import { Express, Request, Response } from 'express';
import userRouter from './user.router';
import sessionRouter from './session.router';

function routes(app: Express): void {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.json({ title: 'healthcheck' });
  });
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/sessions', sessionRouter);
}

console.log('src/routers/index.ts');
export default routes;
