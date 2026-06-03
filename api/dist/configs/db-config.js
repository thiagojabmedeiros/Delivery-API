"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PWD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT,
        "port": Number(process.env.DB_PORT),
        "logging": console.log,
        "define": {
            "timestamps": true,
            "underscored": true
        }
    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PWD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT,
        "port": Number(process.env.DB_PORT)
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PWD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT,
        "port": Number(process.env.DB_PORT)
    }
};
exports.default = config;
//# sourceMappingURL=db-config.js.map