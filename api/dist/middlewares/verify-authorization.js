"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
function verifyAuthorization(role) {
    return (request, response, next) => {
        if (!request.user) {
            throw new AppError_1.default("not authorized", 401);
        }
        if (!role.includes(request.user.role)) {
            throw new AppError_1.default("not authorized", 401);
        }
        return next();
    };
}
exports.default = verifyAuthorization;
//# sourceMappingURL=verify-authorization.js.map