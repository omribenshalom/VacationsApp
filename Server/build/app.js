"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var auth_controller_1 = __importDefault(require("./3-controllers/auth-controller"));
var vacations_controller_1 = __importDefault(require("./3-controllers/vacations-controller"));
var follows_controller_1 = __importDefault(require("./3-controllers/follows-controller"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var error_handler_1 = __importDefault(require("./middleware/error-handler"));
var prevent_garbage_1 = __importDefault(require("./middleware/prevent-garbage"));
var error_model_1 = __importDefault(require("./models/error-model"));
var socket_logic_1 = __importDefault(require("./2-bll/socket-logic"));
var config_1 = __importDefault(require("./utils/config"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config(); // Read .env file into process.env
var server = (0, express_1.default)();
if (config_1.default.isDevelopment) {
    server.use((0, cors_1.default)());
}
server.use(express_1.default.json());
server.use(prevent_garbage_1.default);
server.use((0, express_fileupload_1.default)());
server.use(express_1.default.static(path_1.default.join(__dirname, "client")));
server.use("/api/auth", auth_controller_1.default);
server.use("/api/vacations", vacations_controller_1.default);
server.use("/api/follows", follows_controller_1.default);
server.use("*", function (req, res, next) {
    if (!config_1.default.isDevelopment) {
        // On Prod
        var indexHtmlFile = path_1.default.join(__dirname, "client", "index.html");
        express_1.response.sendFile(indexHtmlFile);
    }
    else {
        // On Dev
        next(new error_model_1.default(404, "Route Not Found."));
    }
});
server.use(error_handler_1.default);
var httpServer = server.listen(process.env.PORT, function () {
    return console.log("Mingling on PORT---".concat(process.env.PORT, " ..."));
});
(0, socket_logic_1.default)(httpServer);
