"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const zod_1 = __importDefault(require("zod"));
const envSchema = zod_1.default.object({
    JWT_SECRET: zod_1.default.string().trim(),
    PORT: zod_1.default.coerce.number().default(3333)
});
const env = envSchema.parse(process.env);
exports.default = env;
