import { NextFunction, Request, Response } from "express";

const logging = (req: Request, res: Response, next: NextFunction) :void => {

    console.log("Request has been made: " + req.method )

    next();

}

export default logging;