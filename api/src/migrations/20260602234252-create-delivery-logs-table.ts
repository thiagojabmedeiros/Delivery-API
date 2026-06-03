'use strict';

import { QueryInterface, DataTypes } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.createTable("delivery-logs", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      delivery_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { key: "id", model: "deliveries"},
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.dropTable("delivery-logs")
  }
};
