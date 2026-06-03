'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable("delivery_logs", {
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            delivery_id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                references: { key: "id", model: "deliveries" },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
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
        await queryInterface.dropTable("delivery_logs");
    }
};
//# sourceMappingURL=20260602234252-create-delivery-logs-table.js.map