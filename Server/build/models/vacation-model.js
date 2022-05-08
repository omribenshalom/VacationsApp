"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var VacationModel = /** @class */ (function () {
    function VacationModel(vacation) {
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
    }
    VacationModel.prototype.validatePost = function () {
        var _a;
        var result = VacationModel.schemaPost.validate(this, {
            abortEarly: false,
        });
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModel.prototype.validatePut = function () {
        var _a;
        var result = VacationModel.schemaPut.validate(this, {
            abortEarly: false,
        });
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModel.schemaPost = joi_1.default.object({
        id: joi_1.default.forbidden(),
        destination: joi_1.default.string().required().min(2).max(20),
        description: joi_1.default.string().required().min(2).max(400),
        startDate: joi_1.default.date().required().min('now').max(new Date(2039, 12, 31)),
        endDate: joi_1.default.date()
            .required()
            .greater(joi_1.default.ref('startDate'))
            .max(new Date(2039, 12, 31)),
        price: joi_1.default.number().required().integer().min(0).max(1000000),
        image: joi_1.default.object().optional(),
        imageName: joi_1.default.string().optional(),
    });
    VacationModel.schemaPut = joi_1.default.object({
        id: joi_1.default.required(),
        destination: joi_1.default.string().required().min(2).max(20),
        description: joi_1.default.string().required().min(2).max(400),
        startDate: joi_1.default.date().required().min('now').max(new Date(2039, 12, 31)),
        endDate: joi_1.default.date()
            .required()
            .greater(joi_1.default.ref('startDate'))
            .max(new Date(2039, 12, 31)),
        price: joi_1.default.number().required().integer().min(0).max(1000000),
        image: joi_1.default.object().optional(),
        imageName: joi_1.default.string().optional(),
    });
    return VacationModel;
}());
exports.default = VacationModel;
