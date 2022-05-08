"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var preventGarbage = function (req, res, next) {
    for (var prop in req.body) {
        if (typeof req.body[prop] === 'string' && req.body[prop].length > 10000) {
            next({ status: 400, message: 'Data too long..' });
            return;
        }
    }
    next();
};
exports.default = preventGarbage;
