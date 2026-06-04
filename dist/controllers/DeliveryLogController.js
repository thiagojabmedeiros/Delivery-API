"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const Delivery_1 = __importDefault(require("../models/Delivery"));
const DeliveryLog_1 = __importDefault(require("../models/DeliveryLog"));
const AppError_1 = __importDefault(require("../utils/AppError"));
class DeliveryLogController {
    async create(request, response) {
        const paramSchema = zod_1.default.object({
            delivery_id: zod_1.default.uuid()
        });
        const bodySchema = zod_1.default.object({
            description: zod_1.default.string().max(100)
        });
        const { description } = bodySchema.parse(request.body);
        const { delivery_id } = paramSchema.parse(request.params);
        const delivery = await Delivery_1.default.findByPk(delivery_id, {
            attributes: ["status"]
        });
        if (!delivery) {
            throw new AppError_1.default("delivery not found", 400);
        }
        if (delivery.toJSON().status === "in progress") {
            throw new AppError_1.default("not possible to register a log in progress", 400);
        }
        if (delivery.toJSON().status === "delivered") {
            throw new AppError_1.default("the order was already delivered", 400);
        }
        const deliveryLog = await DeliveryLog_1.default.create({ delivery_id, description });
        return response.status(201).json(deliveryLog);
    }
    async index(request, response) {
        const paramsSchema = zod_1.default.object({
            delivery_id: zod_1.default.uuid()
        });
        const { delivery_id } = paramsSchema.parse(request.params);
        const delivery = await Delivery_1.default.findByPk(delivery_id, {
            attributes: ["id", "user_id", "status", "description"],
            include: {
                association: "logs",
                attributes: ["description", "created_at"]
            }
        });
        if (!delivery) {
            throw new AppError_1.default("delivery not found", 400);
        }
        return response.status(200).json(delivery);
    }
}
exports.default = DeliveryLogController;
