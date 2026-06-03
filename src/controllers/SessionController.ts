import { Request, Response } from "express"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import z from "zod"

import User from "../models/User"
import AppError from "../utils/AppError"
import authConfig from "../configs/auth-config"

class SessionController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            email: z.email().trim(),
            password: z.string().min(6).trim()
        })
        const { email, password } = bodySchema.parse(request.body)

        const user = await User.findOne({
            where: {
                email: email
            },
            attributes: ["id", "name", "role", "email", "password"]
        })

        if (!user) {
            throw new AppError("invalid email or password", 400)
        }
        
        const validPWD = await compare(password, user.toJSON().password)
        if (!validPWD) {
            throw new AppError("invalid email or password", 400)
        }
        
        const userO = user.toJSON()
        const { secret, expiresIn } = authConfig.jwt

        const token = sign({ id: userO.id, role: userO.role }, secret, { expiresIn: expiresIn })

        const { password: _, ...userWithoutPWD } = user.toJSON()

        return response.status(200).json({
            token: token,
            user: userWithoutPWD
        })
    }
}

export default SessionController