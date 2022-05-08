"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = __importDefault(require("../1-dal/dal"));
var error_model_1 = __importDefault(require("../models/error-model"));
var uuid_1 = require("uuid");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
function getAllVacations(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, parameters, vacations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "\n      SELECT v.vacationId AS id, v.destination, v.description, v.imageName, v.price,\n      v.startDate AS startDate, \n      v.endDate AS endDate,\n      follows_table.userId AS isUserFollow,  \n\n      (SELECT COUNT(*) FROM follows_table          \n      WHERE vacationId = v.vacationId) AS numOfFollowers  \n\n      FROM vacations v \n\n      LEFT JOIN follows_table \n      ON v.vacationId = follows_table.vacationId && follows_table.userId = ?\n  \n      ORDER BY follows_table.userId DESC\n      ";
                    parameters = [userId];
                    return [4 /*yield*/, dal_1.default.execute(sql, parameters)];
                case 1:
                    vacations = _a.sent();
                    return [2 /*return*/, vacations];
            }
        });
    });
}
function getOneVacation(id) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, result, vacation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = " SELECT \n                  vacationId as id, \n                  destination, \n                  description, \n                  startDate, \n                  endDate,\n                  price, \n                  imageName\n                  FROM vacations v\n                  WHERE v.vacationId = ".concat(id);
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    result = _a.sent();
                    vacation = result[0];
                    return [2 /*return*/, vacation];
            }
        });
    });
}
function addVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var error, message, extension, absolutePath, sql, parameters, info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = vacation.validatePost();
                    if (error) {
                        console.log('error logic - ', error);
                        message = error;
                        throw new error_model_1.default(400, message);
                    }
                    if (!vacation.image) return [3 /*break*/, 2];
                    extension = vacation.image.name.substring(vacation.image.name.lastIndexOf('.'));
                    vacation.imageName = (0, uuid_1.v4)() + extension;
                    absolutePath = path_1.default.join(__dirname, '..', 'assets', 'images', vacation.imageName);
                    return [4 /*yield*/, vacation.image.mv(absolutePath)];
                case 1:
                    _a.sent();
                    delete vacation.image;
                    _a.label = 2;
                case 2:
                    sql = " INSERT INTO vacations \n                  (destination, \n                  description, \n                  startDate, \n                  endDate,\n                  price,\n                  imageName)\n                  VALUES(?,?,?,?,?,?)";
                    parameters = [
                        vacation.destination,
                        vacation.description,
                        vacation.startDate,
                        vacation.endDate,
                        vacation.price,
                        vacation.imageName,
                    ];
                    return [4 /*yield*/, dal_1.default.execute(sql, parameters)];
                case 3:
                    info = _a.sent();
                    vacation.id = info.insertId;
                    return [2 /*return*/, vacation];
            }
        });
    });
}
function updateVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var error, extension, absolutePath, sql, parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = vacation.validatePut();
                    if (error) {
                        throw new error_model_1.default(400, error);
                    }
                    if (!vacation.image) return [3 /*break*/, 2];
                    removeImageFromDisk(vacation.imageName);
                    extension = vacation.image.name.substring(vacation.image.name.lastIndexOf('.'));
                    vacation.imageName = (0, uuid_1.v4)() + extension;
                    absolutePath = path_1.default.join(__dirname, '..', 'assets', 'images', vacation.imageName);
                    return [4 /*yield*/, vacation.image.mv(absolutePath)];
                case 1:
                    _a.sent();
                    delete vacation.image;
                    _a.label = 2;
                case 2:
                    sql = " UPDATE vacations \n                  SET\n                  destination = ?,\n                  description = ?,\n                  startDate = ?,\n                  endDate = ?,\n                  price = ?,\n                  imageName = ?\n                  WHERE vacationId = ?";
                    parameters = [
                        vacation.destination,
                        vacation.description,
                        vacation.startDate,
                        vacation.endDate,
                        vacation.price,
                        vacation.imageName,
                        vacation.id,
                    ];
                    return [4 /*yield*/, dal_1.default.execute(sql, parameters)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, vacation];
            }
        });
    });
}
function deleteVacation(id) {
    return __awaiter(this, void 0, void 0, function () {
        var vacation, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getOneVacation(id)];
                case 1:
                    vacation = _a.sent();
                    if (vacation.imageName) {
                        removeImageFromDisk(vacation.imageName);
                    }
                    sql = " DELETE \n                FROM vacations \n                WHERE vacationId = ".concat(id);
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function removeImageFromDisk(imageName) {
    return __awaiter(this, void 0, void 0, function () {
        var absolutePath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    absolutePath = path_1.default.join(__dirname, '..', 'assets', 'images', imageName);
                    return [4 /*yield*/, fs_1.default.unlink(absolutePath, function (err) {
                            if (err)
                                throw err;
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    getAllVacations: getAllVacations,
    getOneVacation: getOneVacation,
    addVacation: addVacation,
    updateVacation: updateVacation,
    deleteVacation: deleteVacation,
};
