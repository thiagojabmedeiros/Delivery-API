import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

import AppError from "../utils/AppError"
import authConfig from "../configs/auth-config"

interface TokenPayLoad {
    role: string
    id: string
}

function ensureAuthenticate(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeaders = request.headers.authorization

    if (!authHeaders) {
        throw new AppError("token not provided", 401)
    }

    const [, token] = authHeaders.split(" ")

    try {
        const { role, id } = verify(token as string, authConfig.jwt.secret) as TokenPayLoad
        
        request.user = {
            role: role,
            id: id
        }

        return next()
    } catch (error) {
        throw new AppError("invalid token", 401)
    }
}

export default ensureAuthenticate