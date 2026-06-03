import DeliveryLogController from "../controllers/DeliveryLogController";
const deliveryLogController = new DeliveryLogController()


import { Router } from "express";
const deliveryLogRoutes = Router()

import verifyAuthorization from "../middlewares/verify-authorization";
import ensureAuthenticate from "../middlewares/ensure-authenticate";

deliveryLogRoutes.use(ensureAuthenticate)

deliveryLogRoutes.post("/:delivery_id", verifyAuthorization(["seller"]), deliveryLogController.create)

export default deliveryLogRoutes