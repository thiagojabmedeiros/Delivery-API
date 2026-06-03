'use strict';

import { QueryInterface, DataTypes } from "sequelize"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.createTable("deliveries", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { key: "id", model: "users" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM("in progress", "coming to you", "delivered"),
        defaultValue: "in progress",
        allowNull: false
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
    await queryInterface.dropTable("deliveries")
  }
};
