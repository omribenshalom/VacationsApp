import express, { Request, Response, NextFunction } from 'express';
import followsLogic from '../2-bll/follows-logic';
// import vacationsLogic from '../2-bll/vacations-logic';
import logging from '../middleware/logging';
import verifyLoggedIn from '../middleware/verify-logged-in';
import cyber from '../utils/cyber';
// import cacheModule from '../utils/cache-module';
import router from './auth-controller';
// import logging from './Server-TS-SQL/src/middleware/logging';

// router.get(
//   '/:id',
//   verifyLoggedIn,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       console.log('Get isFollow .');

//       const userId = await cacheModule.extractUserDataFromCache(req).userId;
//       console.log('userId - ', userId);
//       const vacationId = +req.params.id;
//       console.log('vacationId - ', vacationId);

//       const isFollow = await followsLogic.isUserFollow(userId, vacationId);
//       console.log("isFollow - " , isFollow);
//       res.json(isFollow);
//     } catch (error: any) {
//       next(error);
//     }
//   }
// );

router.post(
  '/:id',
  verifyLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log('FOLLOW .');

      // const userId = await cacheModule.extractUserDataFromCache(req).id;
      const vacationId = +req.params.id;
      // console.log('vacationId - ', vacationId);
      let authorizationString = req.headers['authorization'];
      const userId = cyber.getUserFromToken(authorizationString).id;
      console.log('userId - ', userId);
      await followsLogic.addFollow(userId, vacationId);

      res.status(201).send();
    } catch (error: any) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  verifyLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('UN - FOLLOW .');

      // const userId = await cacheModule.extractUserDataFromCache(req).id;
      let authorizationString = req.headers['authorization'];
      const userId = cyber.getUserFromToken(authorizationString).id;
      console.log('userId - ', userId);
      const vacationId = +req.params.id;
      console.log('vacationId - ', vacationId);

      await followsLogic.unFollow(userId, vacationId);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
