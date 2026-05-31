import dotenv from "dotenv"
dotenv.config()

import z from "zod" 

const envSchema = z.object({
    JWT_SECRET: z.string().trim()
})

const env = envSchema.parse(process.env)

export default env