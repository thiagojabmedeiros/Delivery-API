"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const zod_1 = __importDefault(require("zod"));
const User_1 = __importDefault(require("../models/User"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const auth_config_1 = __importDefault(require("../configs/auth-config"));
class SessionController {
    async create(request, response) {
        const bodySchema = zod_1.default.object({
            email: zod_1.default.email().trim(),
            password: zod_1.default.string().min(6).trim()
        });
        const { email, password } = bodySchema.parse(request.body);
        const user = await User_1.default.findOne({
            where: {
                email: email
            },
            attributes: ["id", "name", "role", "email", "password"]
        });
        if (!user) {
            throw new AppError_1.default("invalid email or password", 400);
        }
        const validPWD = await (0, bcrypt_1.compare)(password, user.toJSON().password);
        if (!validPWD) {
            throw new AppError_1.default("invalid email or password", 400);
        }
        const userO = user.toJSON();
        const { secret, expiresIn } = auth_config_1.default.jwt;
        const token = (0, jsonwebtoken_1.sign)({ id: userO.id, role: userO.role }, secret, { expiresIn: expiresIn });
        const { password: _, ...userWithoutPWD } = user.toJSON();
        return response.status(200).json({
            token: token,
            user: userWithoutPWD
        });
    }
}
exports.default = SessionController;
