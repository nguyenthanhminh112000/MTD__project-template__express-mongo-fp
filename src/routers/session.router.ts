import {Router} from 'express';
import validateResource from './../middleware/validateResource.middleware';
import {createUserSessionHandler} from './../controllers/session.controller';
import {createSessionSchema} from './../schema/session.schema';

const sessionRouter = Router();

sessionRouter.post(
    '/',
    validateResource(createSessionSchema),
    createUserSessionHandler,
);

export default sessionRouter;
