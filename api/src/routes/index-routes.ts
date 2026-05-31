import sessionRoutes from "./session-route"
import userRoutes from "./user-routes"
import deliveryRoutes from "./delivery-routes"

import { Router } from "express"
const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/deliveries", deliveryRoutes)

export default routes