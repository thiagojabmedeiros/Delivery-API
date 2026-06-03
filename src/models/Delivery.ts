import { Sequelize, Model, DataTypes } from "sequelize"

class Delivery extends Model {
    static initialize(connection: Sequelize) {
        this.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            description: DataTypes.STRING,
            status: {
                type: DataTypes.ENUM("in progress", "coming to you", "delivered"),
                defaultValue: "in progress"
            }
        }, {
            sequelize: connection,
            tableName: "deliveries",
            timestamps: true,
            underscored: true
        })
    }

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: "user_id", as: "user" })
        this.hasMany(models.DeliveryLog, { foreignKey: "delivery_id", as: "logs" })
    }
}

export default Delivery