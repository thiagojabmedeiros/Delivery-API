import sessionRoutes from "./session-route"
import userRoutes from "./user-routes"

import { Router } from "express"
const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)

export default routes