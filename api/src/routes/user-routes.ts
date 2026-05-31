import { Router } from "express"
const userRoutes = Router()

import UserController from "../controllers/UserController"
const usercontroller = new UserController()

userRoutes.post("/", usercontroller.create)

export default userRoutes