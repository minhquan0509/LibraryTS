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
    private declare ISBN: number;
    private declare issueDate: Date;
    private declare dueDate: Date;
    private declare returnDate: Date | null;
    private declare status: String;

    // constructor(){
    //     super()
    // }
    public getUserEmail(){
        return this.userEmail;
    }
    public getISBN(){
        return this.ISBN;
    }

    public getIssueDate(){
        return this.issueDate;
    }

    public getDueDate(){
        return this.dueDate;
    }

    public getReturnDate(){
        return this.returnDate;
    }

    public getStatus(){
        return this.status;
    }

    public setIssueDate(date: Date){
        this.issueDate = date;
    }

    public setDueDate(date: Date){
        this.dueDate = date;
    }

    public setReturnDate(date: Date | null){
        this.returnDate = date;
    }

    public setStatus(status: String){
        this.status = status
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
    ISBN:{
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

Loan.belongsTo(Book, { foreignKey: 'ISBN', foreignKeyConstraint: true });
Loan.belongsTo(User, { foreignKey: 'userEmail', foreignKeyConstraint: true });

export = Loan;

