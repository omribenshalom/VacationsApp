"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_1 = __importDefault(require("crypto"));
var salt = "MakeThingsGoRight"; // Hash salt.
var secretKey = "AbraKadabraHokusFokus";
// Hash password:
function hash(plainText) {
    if (!plainText)
        return null;
    // Hashing without salt:
    // const hashedText = crypto.createHash("sha512").update(plainText).digest("hex"); // hex --> convert to string
    // Hashing with salt:
    // HMAC = Hashed based Message Authentication Code
    var hashedText = crypto_1.default
        .createHmac("sha512", salt)
        .update(plainText)
        .digest("hex"); // hex --> convert to string
    return hashedText;
}
function getNewToken(user) {
    var payload = { user: user };
    var token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "2h" });
    return token;
}
function verifyToken(autorizationHeader) {
    return new Promise(function (resolve, reject) {
        if (!autorizationHeader) {
            resolve(false);
            return;
        }
        var token = autorizationHeader.split(" ")[1];
        if (!token) {
            resolve(false);
            return;
        }
        jsonwebtoken_1.default.verify(token, secretKey, function (error) {
            if (error) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
}
function getUserFromToken(autorizationHeader) {
    var token = autorizationHeader.split(" ")[1];
    var payload = jsonwebtoken_1.default.decode(token);
    var user = payload.user;
    return user;
}
exports.default = {
    hash: hash,
    getNewToken: getNewToken,
    verifyToken: verifyToken,
    getUserFromToken: getUserFromToken,
};
