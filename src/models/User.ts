import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../config/db"

class User extends Model {
    private declare email: string;
    private declare password: string;
    private declare isAdmin: boolean;

    public getEmail(){
        return this.email;
    }

    public admin(){
        return this.isAdmin;
    }

    public getPassword(){
        return this.password;
    }
}

User.init({
    // Model attributes are defined here
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    createdAt: false,

  // If don't want updatedAt
    updatedAt: false,
});

export = User;