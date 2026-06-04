"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../env"));
const authConfig = {
    jwt: {
        secret: env_1.default.JWT_SECRET,
        expiresIn: "1d"
    }
};
exports.default = authConfig;
