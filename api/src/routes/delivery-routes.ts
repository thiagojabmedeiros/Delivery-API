import DeliveryController from "../controllers/DeliveryController"
const deliveryController = new DeliveryController()

import { Router } from "express"
const deliveryRoutes = Router()

import ensureAuthenticate from "../middlewares/ensure-authenticate"
import verifyAuthorization from "../middlewares/verify-authorization"

deliveryRoutes.use(ensureAuthenticate)

deliveryRoutes.post("/",  verifyAuthorization(["seller"]),deliveryController.create)
deliveryRoutes.patch("/:id",  verifyAuthorization(["seller"]),deliveryController.update)

export default deliveryRoutes