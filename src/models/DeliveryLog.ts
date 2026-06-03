import { Model, DataTypes, Sequelize } from "sequelize"

class DeliveryLog extends Model {
    static initialize(connection: Sequelize) {
        this.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            description: DataTypes.STRING
        },{
            sequelize: connection,
            tableName: "delivery_logs",
            timestamps: true,
            underscored: true
        })
    }

    static associate(models: any) {
        this.belongsTo(models.Delivery, { foreignKey: "delivery_id", as: "delivery" })
    }
}

export default DeliveryLog