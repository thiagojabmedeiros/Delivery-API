"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeliveryLogController_1 = __importDefault(require("../controllers/DeliveryLogController"));
const deliveryLogController = new DeliveryLogController_1.default();
const express_1 = require("express");
const deliveryLogRoutes = (0, express_1.Router)();
const verify_authorization_1 = __importDefault(require("../middlewares/verify-authorization"));
const ensure_authenticate_1 = __importDefault(require("../middlewares/ensure-authenticate"));
deliveryLogRoutes.use(ensure_authenticate_1.default);
deliveryLogRoutes.post("/:delivery_id", (0, verify_authorization_1.default)(["seller"]), deliveryLogController.create);
deliveryLogRoutes.get("/:delivery_id/logs", (0, verify_authorization_1.default)(["seller", "costumer"]), deliveryLogController.index);
exports.default = deliveryLogRoutes;
//# sourceMappingURL=delivery-logs-routes.js.map