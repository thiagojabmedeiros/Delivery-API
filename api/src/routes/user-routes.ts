import { Router } from "express"
const userRoutes = Router()

import UserController from "../controllers/UserController"
const usercontroller = new UserController()

userRoutes.post("/", usercontroller.create)
userRoutes.get("/:id/orders", usercontroller.index)

export default userRoutes