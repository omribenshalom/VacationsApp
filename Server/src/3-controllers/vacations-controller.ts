import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import vacationsLogic from '../2-bll/vacations-logic';
import logging from '../middleware/logging';
import verifyLoggedIn from '../middleware/verify-logged-in';
import VacationModel from '../models/vacation-model';
import cyber from '../utils/cyber';

const router = express.Router();

router.get(
  '/',
  verifyLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let authorizationString = req.headers['authorization'];
      const userId = cyber.getUserFromToken(authorizationString).id;
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
      const vacation = new VacationModel(req.body);
      const addedVacation = await vacationsLogic.addVacation(vacation);

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

      const vacation = new VacationModel(req.body);
      const updatedVacation = await vacationsLogic.updateVacation(vacation);

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
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageName = req.params.imageName;
      const absolutePath = path.join(
        __dirname,
        '..',
        'assets',
        'images',
        imageName
      );
      res.sendFile(absolutePath);
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
