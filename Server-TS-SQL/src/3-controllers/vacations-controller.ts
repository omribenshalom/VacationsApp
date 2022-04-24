import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import vacationsLogic from '../2-bll/vacations-logic';
import logging from '../middleware/logging';
import verifyLoggedIn from '../middleware/verify-logged-in';
import VacationModel from '../models/vacation-model';
// import cacheModule from '../utils/cache-module';
import cyber from '../utils/cyber';

const router = express.Router();

router.get(
  '/',
  verifyLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const userId = await cacheModule.extractUserDataFromCache(req).id;

      let authorizationString = req.headers['authorization'];
      const userId = cyber.getUserFromToken(authorizationString).id;
      // console.log('user - id - ', userId);

      const vacations = await vacationsLogic.getAllVacations(userId);
      res.json(vacations);
    } catch (error: any) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  verifyLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      const vacation = await vacationsLogic.getOneVacation(id);
      res.json(vacation);
    } catch (error: any) {
      next(error);
    }
  }
);

router.post(
  '/',
  verifyLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.image = req.files?.image;
      console.log('Controller: Add Vacation Data - ', req.body);

      const vacation = new VacationModel(req.body);
      console.log('vacation - ', vacation);

      const addedVacation = await vacationsLogic.addVacation(vacation);
      console.log('addedVacation - ', addedVacation);

      res.status(201).json(addedVacation);
    } catch (error: any) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  verifyLoggedIn,
  logging,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      req.body.id = id;
      req.body.image = req.files?.image;

      console.log('req.body - ', req.body);

      const vacation = new VacationModel(req.body);

      // console.log("vacation - " , vacation);

      const updatedVacation = await vacationsLogic.updateVacation(vacation);

      console.log('updatedVacation - ', updatedVacation);

      res.json(updatedVacation);
    } catch (error: any) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  verifyLoggedIn,
  logging,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      await vacationsLogic.deleteVacation(id);
      res.sendStatus(204);
    } catch (error: any) {
      next(error);
    }
  }
);

router.get(
  '/images/:imageName',
  (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;
      // const absolutePath = __dirname + `\\..\\assets\\images\\` + imageName
      const absolutePath = path.join(
        __dirname,
        '..',
        'assets',
        'images',
        imageName
      );
      response.sendFile(absolutePath);
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
