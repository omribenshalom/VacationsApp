import express, { NextFunction, Request, response, Response } from "express";
import authController from "./3-controllers/auth-controller";
import vacationsController from "./3-controllers/vacations-controller";
import followController from "./3-controllers/follows-controller";
import fileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";

import errorHandler from "./middleware/error-handler";
import preventGarbage from "./middleware/prevent-garbage";
import ErrorModel from "./models/error-model";
import socketLogic from "./2-bll/socket-logic";
import config from "./utils/config";
import path from "path";

dotenv.config(); // Read .env file into process.env

const server = express();

if (config.isDevelopment) {
  server.use(cors());
}
server.use(express.json());
server.use(preventGarbage);
server.use(fileUpload());

server.use(express.static(path.join(__dirname, "client")));

server.use("/api/auth", authController);
server.use("/api/vacations", vacationsController);
server.use("/api/follows", followController);

server.use("*", (req: Request, res: Response, next: NextFunction) => {
  
  if (!config.isDevelopment) {
    // On Prod
    const indexHtmlFile = path.join(__dirname, "client", "index.html");
    response.sendFile(indexHtmlFile);
  } else {
    // On Dev
    next(new ErrorModel(404, "Route Not Found."));
  }
});

server.use(errorHandler);

const httpServer = server.listen(process.env.PORT, () =>
  console.log(`Mingling on PORT---${process.env.PORT} ...`)
);

socketLogic(httpServer);
