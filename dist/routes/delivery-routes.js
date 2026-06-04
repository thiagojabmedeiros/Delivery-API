"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeliveryController_1 = __importDefault(require("../controllers/DeliveryController"));
const deliveryController = new DeliveryController_1.default();
const express_1 = require("express");
const deliveryRoutes = (0, express_1.Router)();
const ensure_authenticate_1 = __importDefault(require("../middlewares/ensure-authenticate"));
const verify_authorization_1 = __importDefault(require("../middlewares/verify-authorization"));
deliveryRoutes.use(ensure_authenticate_1.default);
deliveryRoutes.post("/", (0, verify_authorization_1.default)(["seller"]), deliveryController.create);
deliveryRoutes.patch("/:id", (0, verify_authorization_1.default)(["seller"]), deliveryController.update);
exports.default = deliveryRoutes;
