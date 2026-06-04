"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = __importDefault(require("../utils/AppError"));
const auth_config_1 = __importDefault(require("../configs/auth-config"));
function ensureAuthenticate(request, response, next) {
    const authHeaders = request.headers.authorization;
    if (!authHeaders) {
        throw new AppError_1.default("token not provided", 401);
    }
    const [, token] = authHeaders.split(" ");
    try {
        const { role, id } = (0, jsonwebtoken_1.verify)(token, auth_config_1.default.jwt.secret);
        request.user = {
            role: role,
            id: id
        };
        return next();
    }
    catch (error) {
        throw new AppError_1.default("invalid token", 401);
    }
}
exports.default = ensureAuthenticate;
