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
}

export default DeliveryController