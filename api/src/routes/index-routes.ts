import sessionRoutes from "./session-route"
import userRoutes from "./user-routes"
import deliveryRoutes from "./delivery-routes"
import deliveryLogRoutes from "./delivery-logs-routes"

import { Router } from "express"
const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/deliveries", deliveryRoutes)
routes.use("/deliveries", deliveryLogRoutes)

export default routes