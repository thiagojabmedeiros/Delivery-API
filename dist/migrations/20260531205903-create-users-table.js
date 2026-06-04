'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable("users", {
            id: {
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                allowNull: false
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: sequelize_1.DataTypes.ENUM("costumer", "seller"),
                defaultValue: "costumer",
                allowNull: false
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            }
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable("users");
    }
};
