import { Request, Response } from 'express';
import { validPassword } from '../service/user.service';
import { createSession } from '../service/session.service';
import { signJwt, verifyJwt } from './../utils/jwt.utils';
import config from 'config';
export async function createUserSessionHandler(req: Request, res: Response) {
  // valid user's password
  const user = await validPassword(req.body);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  //create session
  const session = await createSession(user._id, req.get('user-agent') || '');
  //create accessToken
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') },
  );
  //create refreshToken
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') },
  );
  return res.json({ accessToken, refreshToken });
}

export const getUserSessionsHandler = () => {};
