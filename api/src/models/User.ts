import { Sequelize, Model, DataTypes } from "sequelize"

class User extends Model {
    static initialize(sequelize: Sequelize) {
        this.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: DataTypes.STRING,
            role: {
                type: DataTypes.ENUM("costumer", "seller"),
                defaultValue: "costumer"
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING
        }, {
            sequelize,
            tableName: "users",
            timestamps: true,
            underscored: true
        })
    }
}

export default User