import { Request, Response } from 'express';
import logger from './../utils/logger';
import { createUser } from './../service/user.service';
import { CreateUserInput } from './../schema/user.schema';
import _ from 'lodash';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
) {
  try {
    const user = await createUser(req.body);
    return res.json(_.omit(user.toJSON(), 'password'));
  } catch (error: any) {
    logger.error(error.message);
    return res
      .status(409)
      .json({ status: 409, message: 'User already exist.' });
  }
}
