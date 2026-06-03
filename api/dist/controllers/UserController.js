"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = require("bcrypt");
const User_1 = __importDefault(require("../models/User"));
const Delivery_1 = __importDefault(require("../models/Delivery"));
const AppError_1 = __importDefault(require("../utils/AppError"));
class UserController {
    async create(request, response) {
        const bodySchema = zod_1.default.object({
            name: zod_1.default.string().min(3).trim(),
            role: zod_1.default.enum(["costumer", "seller"]).nullish(),
            email: zod_1.default.email().trim(),
            password: zod_1.default.string().min(6).trim()
        });
        const { name, role, email, password } = bodySchema.parse(request.body);
        const existentEmail = await User_1.default.findOne({
            where: {
                email: email
            }
        });
        if (existentEmail) {
            throw new AppError_1.default("another user already asigned this email", 400);
        }
        const hashedPWD = await (0, bcrypt_1.hash)(password, 8);
        const user = await User_1.default.create({ name, role, email, password: hashedPWD });
        const { password: _, ...userWithoutPWD } = user.toJSON();
        return response.status(201).json(userWithoutPWD);
    }
    async index(request, response) {
        const paramsSchema = zod_1.default.object({
            id: zod_1.default.uuid().trim()
        });
        const { id } = paramsSchema.parse(request.params);
        const user = await User_1.default.findByPk(id);
        if (!user) {
            throw new AppError_1.default("user does not exist", 400);
        }
        const orders = await Delivery_1.default.findAll({
            attributes: ["id", "description", "status", "created_at", "updated_at"],
            where: {
                user_id: id
            }
        });
        if (orders.length == 0) {
            throw new AppError_1.default("user has not ordered anything yet", 400);
        }
        return response.json(orders);
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map