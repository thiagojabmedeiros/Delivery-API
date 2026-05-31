import { Request, Response } from "express"
import z from "zod"

import User from "../models/User"

class UserController {
    async create(request: Request, response: Response) {
        console.log("hello")
        return response.status(201).json({
            message: "user created"
        })
    }
}

export default UserController