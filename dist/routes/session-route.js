"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SessionController_1 = __importDefault(require("../controllers/SessionController"));
const sessionController = new SessionController_1.default();
const express_1 = require("express");
const sessionRoutes = (0, express_1.Router)();
sessionRoutes.post("/", sessionController.create);
exports.default = sessionRoutes;
