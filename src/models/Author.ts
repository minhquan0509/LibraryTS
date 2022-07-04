import db from "../config/db"
import express, { Application, Request, Response } from 'express';
import { Sequelize, DataTypes, Model } from "sequelize";

class Author extends Model {
    private declare authorName: string;
    private declare nationality: string;
    private declare DOB: number;
    private declare death: number;
    // constructor(authorName: string, nationality: string, DOB: number, death: number){
    //     super();
    //     this.authorName = authorName;
    //     this.nationality = nationality;
    //     this.DOB = DOB;
    //     this.death = death;
    // }
    public getName(){
        return this.authorName;
    }

    public getNationality(){
        return this.nationality;
    }

    public getDOB(){
        return this.DOB;
    }

    public getDeath(){
        return this.DOB;
    }
}

Author.init({
    // Model attributes are defined here
    ID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    authorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    DOB: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
    },
    death: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
    modelName: 'Author', // We need to choose the model name
    createdAt: false,

  // If don't want updatedAt
    updatedAt: false,
});

export = Author;