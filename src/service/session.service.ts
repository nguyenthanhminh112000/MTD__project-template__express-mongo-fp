import SessionModel from '../models/session.model';
import { FilterQuery } from 'mongoose';
export async function createSession(
  user: string,
  userAgent: string,
): Promise<any> {
  const session = await SessionModel.create({ user, userAgent });
  return session.toJSON();
}
