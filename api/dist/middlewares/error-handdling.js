"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const AppError_1 = __importDefault(require("../utils/AppError"));
function errorHanddling(error, request, response, next) {
    if (error instanceof AppError_1.default) {
        return response.status(error.statusCode).json({
            message: error.message
        });
    }
    if (error instanceof zod_1.default.ZodError) {
        return response.status(400).json({
            message: "validation error",
            issues: zod_1.default.prettifyError(error)
        });
    }
    if (error instanceof Error) {
        return response.status(500).json({
            message: error.message,
            from: error.name
        });
    }
    return response.status(500).json({
        message: "internal server error"
    });
}
exports.default = errorHanddling;
//# sourceMappingURL=error-handdling.js.map