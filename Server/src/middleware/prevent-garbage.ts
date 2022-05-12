import { NextFunction, Request, Response } from 'express';

const preventGarbage = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  for (const prop in req.body) {
    if (typeof req.body[prop] === 'string' && req.body[prop].length > 10000) {
      next({ status: 400, message: 'Data too long..' });
      return;
    }
  }
  next();
};

export default preventGarbage;
