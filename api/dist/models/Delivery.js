"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Delivery extends sequelize_1.Model {
    static initialize(connection) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                defaultValue: sequelize_1.DataTypes.UUIDV4
            },
            description: sequelize_1.DataTypes.STRING,
            status: {
                type: sequelize_1.DataTypes.ENUM("in progress", "coming to you", "delivered"),
                defaultValue: "in progress"
            }
        }, {
            sequelize: connection,
            tableName: "deliveries",
            timestamps: true,
            underscored: true
        });
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
        this.hasMany(models.DeliveryLog, { foreignKey: "delivery_id", as: "logs" });
    }
}
exports.default = Delivery;
//# sourceMappingURL=Delivery.js.map