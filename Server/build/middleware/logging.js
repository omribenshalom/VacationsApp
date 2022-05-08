"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logging = function (req, res, next) {
    console.log("Request has been made: " + req.method);
    next();
};
exports.default = logging;
