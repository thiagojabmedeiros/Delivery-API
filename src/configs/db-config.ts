import dotenv from "dotenv"
dotenv.config()

import type { Dialect } from "sequelize"

const config = {
  "development": {
    "username": process.env.DB_USER as string,
    "password": process.env.DB_PWD as string,
    "database": process.env.DB_NAME as string,
    "host": process.env.DB_HOST as string,
    "dialect": process.env.DB_DIALECT as Dialect,
    "port": Number(process.env.DB_PORT),
    "logging": console.log,
    "define": {
      "timestamps": true,
      "underscored": true
    }
  },
  "test": {
    "username": process.env.DB_USER as string,
    "password": process.env.DB_PWD as string,
    "database": process.env.DB_NAME as string,
    "host": process.env.DB_HOST as string,
    "dialect": process.env.DB_DIALECT as Dialect,
    "port": Number(process.env.DB_PORT)
  },
  "production": {
    "username": process.env.DB_USER as string,
    "password": process.env.DB_PWD as string,
    "database": process.env.DB_NAME as string,
    "host": process.env.DB_HOST as string,
    "dialect": process.env.DB_DIALECT as Dialect,
    "dialectOptions": {
          "ssl": {
            "require": true,
            "rejectUnauthorized": false
          }
        },
    "port": Number(process.env.DB_PORT),
    "define": {
      "timestamps": true,
      "underscored": true
    }
  }
}

export default config