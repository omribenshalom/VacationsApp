import express, { NextFunction, Request, Response } from 'express';
import logic from '../2-bll/auth-logic';

import UserModel from '../models/user-model';
import CredentialsModel from '../models/credentials-model';


const router = express.Router();

router.post(
  '/register',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = new UserModel(request.body);
      const token = await logic.register(user);
      response.status(201).json(token);
    } catch (error: any) {
      console.log("Somthing went wrong.. | Register. Controller. Catch")
      next(error);
    }
  }
);

router.post(
  '/login',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const credentials = new CredentialsModel(request.body);
      const token = await logic.login(credentials);
      response.json(token);
    } catch (error: any) {
      console.log("Somthing went wrong.. | Login. Controller. Catch")
      next(error);
    }
  }
);

export default router;