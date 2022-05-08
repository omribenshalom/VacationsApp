"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var UserModel = /** @class */ (function () {
    function UserModel(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }
    UserModel.prototype.validateRegister = function () {
        var _a;
        var result = UserModel.schemaPost.validate(this, { abortEarly: false });
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    UserModel.schemaPost = joi_1.default.object({
        id: joi_1.default.forbidden(),
        firstName: joi_1.default.string().required().min(2).max(30),
        lastName: joi_1.default.string().required().min(2).max(30),
        email: joi_1.default.string()
            .required()
            .email({ tlds: { allow: false } }),
        password: joi_1.default.string().required().min(5).max(20),
        role: joi_1.default.forbidden(),
    });
    return UserModel;
}());
exports.default = UserModel;
