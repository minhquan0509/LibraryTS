import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../config/db"
import User from './User'
import Book from "./Book";
enum Status{
    "inProgress",
    "returned",
    "overdue"
}

class Loan extends Model{
    private declare ID: number;
    private declare userEmail: string;
    private declare bookID: number;
    private declare issueDate: Date;
    private declare dueDate: Date;
    private declare returnDate: Date | null;
    private declare status: Status;

    // constructor(){
    //     super()
    // }
    public getUserEmail(){
        return this.userEmail;
    }
    public getBookID(){
        return this.bookID;
    }
    
}

Loan.init({
    // Model attributes are defined here
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bookID:{
        type: DataTypes.INTEGER,
    },
    issueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: true,

    },
    status: {
        type: DataTypes.ENUM,
        values: [
            "inProgress",
            "overdue",
            "closed"
        ],
    },
}, {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
    modelName: 'Loan', // We need to choose the model name
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
});

Loan.belongsTo(Book, { foreignKey: 'bookID', foreignKeyConstraint: true });
Loan.belongsTo(User, { foreignKey: 'userEmail', foreignKeyConstraint: true });

export = Loan;

