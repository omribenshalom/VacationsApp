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
var cyber_1 = __importDefault(require("../utils/cyber"));
var uuid_1 = require("uuid");
function register(user) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, isTaken, sql, parameters, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = user.validateRegister();
                    if (errors) {
                        throw new error_model_1.default(400, errors);
                    }
                    return [4 /*yield*/, isEmailTaken(user.email)];
                case 1:
                    isTaken = _a.sent();
                    if (isTaken) {
                        console.log('email is taken');
                        throw new error_model_1.default(400, "Sorry. Email ".concat(user.email, " is not available."));
                    }
                    // Hash password:
                    user.password = cyber_1.default.hash(user.password);
                    // new UUID as new ID:
                    user.id = (0, uuid_1.v4)();
                    sql = "INSERT INTO users(userId, firstName, lastName, email, password, role)\n  VALUES(?, ?, ?, ?, ? , 0)";
                    parameters = [
                        user.id,
                        user.firstName,
                        user.lastName,
                        user.email,
                        user.password,
                    ];
                    return [4 /*yield*/, dal_1.default.execute(sql, parameters)];
                case 2:
                    _a.sent();
                    console.log("New User - ".concat(user.firstName + ' ' + user.lastName, " - Registered Successfully."));
                    // Remove password:
                    delete user.password;
                    console.log("auth-logic-REGISTER - USER - ", user);
                    token = cyber_1.default.getNewToken(user);
                    return [2 /*return*/, token];
            }
        });
    });
}
function login(credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, sql, parameters, users, user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = credentials.validateLogin();
                    if (errors) {
                        throw new error_model_1.default(400, credentials.validateLogin());
                    }
                    // Hash password:
                    credentials.password = cyber_1.default.hash(credentials.password);
                    sql = "SELECT userId AS id, firstName, lastName, email, role\n              FROM users \n              WHERE email = ? AND password = ?";
                    parameters = [credentials.email, credentials.password];
                    return [4 /*yield*/, dal_1.default.execute(sql, parameters)];
                case 1:
                    users = _a.sent();
                    // If user not exists:
                    if (users.length === 0) {
                        throw new error_model_1.default(401, 'Incorrect username or password');
                    }
                    user = users[0];
                    console.log("User - ".concat(user.firstName + ' ' + user.lastName, " - Logeed In Successfully."));
                    // Remove password:
                    delete user.password;
                    console.log("auth-logic-LOGIN - USER - ", user);
                    token = cyber_1.default.getNewToken(user);
                    return [2 /*return*/, token];
            }
        });
    });
}
function isEmailTaken(email) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, table, row, count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
                    return [4 /*yield*/, dal_1.default.execute(sql, [email])];
                case 1:
                    table = _a.sent();
                    row = table[0];
                    count = row.count;
                    return [2 /*return*/, count > 0];
            }
        });
    });
}
exports.default = {
    register: register,
    login: login,
};
