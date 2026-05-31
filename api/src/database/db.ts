import config from "../configs/db-config"

import User from "../models/User"
import Delivery from "../models/Delivery"

import { Sequelize } from "sequelize"
const database = new Sequelize(config.development)

User.initialize(database)
Delivery.initialize(database)

User.associate(database.models)
Delivery.associate(database.models)

export default database