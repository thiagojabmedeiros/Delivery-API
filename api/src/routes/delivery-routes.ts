import DeliveryController from "../controllers/DeliveryController"
const deliveryController = new DeliveryController()

import { Router } from "express"
const deliveryRoutes = Router()

deliveryRoutes.post("/", deliveryController.create)
deliveryRoutes.patch("/:id", deliveryController.update)

export default deliveryRoutes