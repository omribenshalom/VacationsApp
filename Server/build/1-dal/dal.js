"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var config_1 = __importDefault(require("../utils/config"));
var connection = mysql_1.default.createPool({
    host: config_1.default.mysql.host,
    user: config_1.default.mysql.user,
    password: config_1.default.mysql.password,
    database: config_1.default.mysql.database,
});
function execute(sql, values) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, values, function (err, result) {
            if (err) {
                console.log('Failed interacting with DB.');
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}
exports.default = {
    execute: execute
};
