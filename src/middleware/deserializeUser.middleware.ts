import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { verifyJwt } from '../utils/jwt.utils';
const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = _.get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    '',
  );

  if (!accessToken) {
    return next();
  }
  const { decode, expired } = verifyJwt(accessToken);

  if (decode) {
    res.locals.user = decode;
    return next();
  }
  return next();
};

export default deserializeUser;
