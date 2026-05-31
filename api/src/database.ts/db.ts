import config from "../configs/db-config"

import { Sequelize } from "sequelize"
const database = new Sequelize(config.development)

export default database