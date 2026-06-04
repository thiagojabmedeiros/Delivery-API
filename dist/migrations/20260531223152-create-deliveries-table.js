'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable("deliveries", {
            id: {
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                allowNull: false
            },
            user_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                references: { key: "id", model: "users" },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: sequelize_1.DataTypes.ENUM("in progress", "coming to you", "delivered"),
                defaultValue: "in progress",
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
        await queryInterface.dropTable("deliveries");
    }
};
