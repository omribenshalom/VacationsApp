import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) :void => {

    const status = err.status || 500;
    console.log("Error Handler: ", err);

    res.status(status).send(err.message);
}

export default errorHandler;