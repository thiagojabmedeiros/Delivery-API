import { Request, Response } from "express"
import z from "zod"
import { hash } from "bcrypt"

import User from "../models/User"

class UserController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().min(3).trim(),
            role: z.enum(["costumer", "seller"]).nullish(),
            email: z.email().trim(),
            password: z.string().min(6).trim()
        })

        const { name, role, email, password } = bodySchema.parse(request.body)
        
        const hashedPWD = await hash(password, 8)

        const user = await User.create({ name, role, email, password: hashedPWD })
        
        const { password: _, ...UserWithoutPWD } = user.toJSON()

        return response.status(201).json(UserWithoutPWD)
    }
} 

export default UserController