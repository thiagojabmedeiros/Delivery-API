import config from "../configs/db-config"

import User from "../models/User"
import Delivery from "../models/Delivery"
import DeliveryLog from "../models/DeliveryLog"

import { Sequelize } from "sequelize"
const database = new Sequelize(config.production)

User.initialize(database)
Delivery.initialize(database)
DeliveryLog.initialize(database)

User.associate(database.models)
Delivery.associate(database.models)
DeliveryLog.associate(database.models)

export default database