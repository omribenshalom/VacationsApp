import express, { NextFunction, Request, Response } from 'express';
import authController from './3-controllers/auth-controller';
import vacationsController from './3-controllers/vacations-controller';
import followController from './3-controllers/follows-controller';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import dotenv from 'dotenv';

import errorHandler from './middleware/error-handler';
import preventGarbage from './middleware/prevent-garbage';
import ErrorModel from './models/error-model';

import socketLogic from "./2-bll/socket-logic";


dotenv.config(); // Read .env file into process.env

const server = express();

server.use(cors());
// server.use(cors({ origin: ['http://localhost:3000', 'http://localhost:4200'] }));

server.use(express.json());
server.use(preventGarbage);
server.use(fileUpload());

server.use('/api/auth', authController);
server.use('/api/vacations', vacationsController);
server.use('/api/follows', followController);


server.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new ErrorModel(404, 'Route Not Found.'));
});

server.use(errorHandler);


const httpServer = server.listen(process.env.PORT, () =>
  console.log(`Mingling on PORT---${process.env.PORT} ...`)
);

socketLogic(httpServer);
