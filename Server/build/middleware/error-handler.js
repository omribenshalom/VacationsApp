"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler = function (err, req, res, next) {
    var status = err.status || 500;
    console.log("Error Handler: ", err);
    res.status(status).send(err.message);
};
exports.default = errorHandler;
