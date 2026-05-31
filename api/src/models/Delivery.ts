import { Sequelize, Model, DataTypes } from "sequelize"

class Delivery extends Model {
    static initialize(sequelize: Sequelize) {
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
            sequelize,
            timestamps: true,
            underscored: true
        })
    }

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: "user_id", as: "user" })
    }
}

export default Delivery