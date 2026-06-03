"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class DeliveryLog extends sequelize_1.Model {
    static initialize(connection) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            description: sequelize_1.DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: "delivery_logs",
            timestamps: true,
            underscored: true
        });
    }
    static associate(models) {
        this.belongsTo(models.Delivery, { foreignKey: "delivery_id", as: "delivery" });
    }
}
exports.default = DeliveryLog;
//# sourceMappingURL=DeliveryLog.js.map