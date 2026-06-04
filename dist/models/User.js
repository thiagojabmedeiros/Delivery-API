"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true
            },
            name: sequelize_1.DataTypes.STRING,
            role: {
                type: sequelize_1.DataTypes.ENUM("costumer", "seller"),
                defaultValue: "costumer"
            },
            email: sequelize_1.DataTypes.STRING,
            password: sequelize_1.DataTypes.STRING
        }, {
            sequelize,
            tableName: "users",
            timestamps: true,
            underscored: true
        });
    }
    static associate(models) {
        this.hasMany(models.Delivery, { foreignKey: "user_id", as: "deliveries" });
    }
}
exports.default = User;
