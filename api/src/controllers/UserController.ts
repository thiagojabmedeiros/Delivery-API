import { Request, Response } from "express"
import z from "zod"
import { hash } from "bcrypt"

import User from "../models/User"
import Delivery from "../models/Delivery"
import AppError from "../utils/AppError"

class UserController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().min(3).trim(),
            role: z.enum(["costumer", "seller"]).nullish(),
            email: z.email().trim(),
            password: z.string().min(6).trim()
        })

        const { name, role, email, password } = bodySchema.parse(request.body)
        
        const existentEmail = await User.findOne({
            where: {
                email: email
            }
        })
        if (existentEmail) {
            throw new AppError("another user already asigned this email", 400)
        }

        const hashedPWD = await hash(password, 8)

        const user = await User.create({ name, role, email, password: hashedPWD })
        
        const { password: _, ...userWithoutPWD } = user.toJSON()

        return response.status(201).json(userWithoutPWD)
    }

    async index(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.uuid().trim()
        })

        const { id } = paramsSchema.parse(request.params)

        const user = await User.findByPk(id)

        if (!user) {
            throw new AppError("user does not exist", 400)
        }
        const orders = await Delivery.findAll({
            attributes: ["id", "description", "status", "created_at"],
            where: {
                user_id: id
            }
        })

        if (orders.length == 0) {
            return response.json({ message: "user has not ordered anything yet" })
        }
        
        return response.json(orders)
    }
} 

export default UserController