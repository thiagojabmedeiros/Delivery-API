'use strict';
import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.addColumn("delivery-logs", "description", {
      type: DataTypes.STRING,
      allowNull: false
    })
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.removeColumn("delivery-logs", "description")
  }
};
