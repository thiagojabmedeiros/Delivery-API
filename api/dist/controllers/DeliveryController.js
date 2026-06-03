"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const Delivery_1 = __importDefault(require("../models/Delivery"));
const User_1 = __importDefault(require("../models/User"));
const AppError_1 = __importDefault(require("../utils/AppError"));
class DeliveryController {
    async create(request, response) {
        const bodySchema = zod_1.default.object({
            user_id: zod_1.default.uuid().trim(),
            description: zod_1.default.string().max(100),
            status: zod_1.default.enum(["in progress"]).nullish()
        });
        const { user_id, description, status } = bodySchema.parse(request.body);
        const user = await User_1.default.findByPk(user_id);
        if (!user) {
            throw new AppError_1.default("user does not exist", 400);
        }
        const delivery = await Delivery_1.default.create({ user_id, description, status });
        return response.json(delivery);
    }
    async update(request, response) {
        const paramsSchema = zod_1.default.object({
            id: zod_1.default.uuid().trim()
        });
        const { id } = paramsSchema.parse(request.params);
        const delivery = await Delivery_1.default.findByPk(id, {
            attributes: ["id", "description", "status"]
        });
        if (!delivery) {
            throw new AppError_1.default("order does not exist", 400);
        }
        const bodySchema = zod_1.default.object({
            status: zod_1.default.enum(["coming to you", "delivered"])
        });
        const { status } = bodySchema.parse(request.body);
        await delivery.update({ status });
        return response.status(200).json(delivery);
    }
}
exports.default = DeliveryController;
//# sourceMappingURL=DeliveryController.js.map