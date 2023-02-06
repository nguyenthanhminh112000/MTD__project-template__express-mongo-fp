import { object, string } from 'zod';
import {
  EMAIL_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from './../constants/userInput';
export const createSessionSchema = object({
  body: object({
    email: string({ required_error: 'Email is required.' })
      .email({ message: 'Invalid email address' })
      .min(EMAIL_MIN_LENGTH, {
        message: `Email must have at least ${EMAIL_MIN_LENGTH} characters.`,
      })
      .max(EMAIL_MAX_LENGTH, {
        message: `Email characters must have less than ${EMAIL_MAX_LENGTH}`,
      }),
    password: string({ required_error: 'Password is requir ed' })
      .min(PASSWORD_MIN_LENGTH, {
        message: `Password must have at least ${PASSWORD_MIN_LENGTH}`,
      })
      .max(PASSWORD_MAX_LENGTH, {
        message: `Password characters must be less than ${PASSWORD_MAX_LENGTH}`,
      }),
  }),
});
