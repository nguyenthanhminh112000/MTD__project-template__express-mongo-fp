import { Router } from 'express';
import { createUserHandler } from './../controllers/user.controller';
import validateResource from './../middleware/validateResource.middleware';
import { createUserSchema } from './../schema/user.schema';
const userRouter = Router();
userRouter.post(
  '/register',
  validateResource(createUserSchema),
  createUserHandler,
);

export default userRouter;
