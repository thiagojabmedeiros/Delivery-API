"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_route_1 = __importDefault(require("./session-route"));
const user_routes_1 = __importDefault(require("./user-routes"));
const delivery_routes_1 = __importDefault(require("./delivery-routes"));
const delivery_logs_routes_1 = __importDefault(require("./delivery-logs-routes"));
const express_1 = require("express");
const routes = (0, express_1.Router)();
routes.use("/users", user_routes_1.default);
routes.use("/sessions", session_route_1.default);
routes.use("/deliveries", delivery_routes_1.default);
routes.use("/deliveries", delivery_logs_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index-routes.js.map