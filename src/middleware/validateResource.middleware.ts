import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

console.log('src/middleware/validateResource.middleware.ts outside');
const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log('src/middleware/validateResource.middleware.ts');

    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      return res.status(400).json(error.errors);
    }
  };
export default validate;
