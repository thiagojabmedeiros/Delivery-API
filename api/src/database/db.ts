import config from "../configs/db-config"

import User from "../models/User"

import { Sequelize } from "sequelize"
const database = new Sequelize(config.development)

User.initialize(database)

export default database