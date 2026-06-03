import { Request, Response } from "express";
import z from "zod";

import Delivery from "../models/Delivery";
import DeliveryLog from "../models/DeliveryLog";
import User from "../models/User";

import AppError from "../utils/AppError";

class DeliveryLogController {
    async create(request: Request, response: Response) {
        const paramSchema = z.object({
            delivery_id: z.uuid()
        })
        const bodySchema = z.object({
            description: z.string().max(100)
        }) 
        const { description } = bodySchema.parse(request.body)

        const { delivery_id } = paramSchema.parse(request.params)

        const delivery = await Delivery.findByPk(delivery_id, {
            attributes: ["status"]
        })
        
        if (!delivery) {
            throw new AppError("delivery not found", 400)
        }
        
        if (delivery.toJSON().status === "in progress") {
            throw new AppError("not possible to register a log in progress", 400)
        }

        const deliveryLog = await DeliveryLog.create({ delivery_id, description })

        return response.status(201).json(deliveryLog)
    }
}

export default DeliveryLogController