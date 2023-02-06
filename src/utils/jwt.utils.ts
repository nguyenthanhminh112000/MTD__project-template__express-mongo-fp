import jwt from 'jsonwebtoken';
import config from 'config';
const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

// {
//     algorithm: 'RS256',
//     ...(options && options),
//   }

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    algorithm: 'HS256',
    ...(options && options),
  });
}
export function verifyJwt(token: string) {
  try {
    const decode = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decode,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decode: null,
    };
  }
}
