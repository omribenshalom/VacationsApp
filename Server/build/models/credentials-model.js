"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var CredentialsModel = /** @class */ (function () {
    function CredentialsModel(user) {
        this.email = user.email;
        this.password = user.password;
    }
    CredentialsModel.prototype.validateLogin = function () {
        var _a;
        var result = CredentialsModel.schemaPost.validate(this, {
            abortEarly: false,
        });
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    CredentialsModel.schemaPost = joi_1.default.object({
        email: joi_1.default.string()
            .required()
            .email({ tlds: { allow: false } }),
        password: joi_1.default.string().required().min(5).max(20),
    });
    return CredentialsModel;
}());
exports.default = CredentialsModel;
