"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../configs/db-config"));
const User_1 = __importDefault(require("../models/User"));
const Delivery_1 = __importDefault(require("../models/Delivery"));
const DeliveryLog_1 = __importDefault(require("../models/DeliveryLog"));
const sequelize_1 = require("sequelize");
const database = new sequelize_1.Sequelize(db_config_1.default.development);
User_1.default.initialize(database);
Delivery_1.default.initialize(database);
DeliveryLog_1.default.initialize(database);
User_1.default.associate(database.models);
Delivery_1.default.associate(database.models);
DeliveryLog_1.default.associate(database.models);
exports.default = database;
//# sourceMappingURL=db.js.map