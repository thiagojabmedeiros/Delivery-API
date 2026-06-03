import { Request, Response } from "express"
import z from "zod"

import Delivery from "../models/Delivery"
import User from "../models/User"
import AppError from "../utils/AppError"

class DeliveryController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            user_id: z.uuid().trim(),
            description: z.string().max(100),
            status: z.enum(["in progress"]).nullish()
        })
        const { user_id, description, status } = bodySchema.parse(request.body)

        const user = await User.findByPk(user_id)

        if (!user) {
            throw new AppError("user does not exist", 400)
        }

        const delivery = await Delivery.create({ user_id, description, status })

        return response.json(delivery)
    }

    async update(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.uuid().trim()
        })
        const { id } = paramsSchema.parse(request.params)

        const delivery = await Delivery.findByPk(id, {
            attributes: ["id", "description", "status"]
        })
        if (!delivery) {
            throw new AppError("order does not exist", 400)
        }

        const bodySchema = z.object({
            status: z.enum(["coming to you", "delivered"])
        })
        const { status } = bodySchema.parse(request.body)

        await delivery.update({ status })

        return response.status(200).json(delivery)
    }
}

export default DeliveryController