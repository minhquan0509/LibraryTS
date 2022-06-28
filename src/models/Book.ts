import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../config/db"

class Book extends Model{
    private declare bookID: number;
    private declare title: string;
    private declare author: string;
    private declare description: string;
    private declare numOfCopies: number;
    private declare imageLink: string;
    private declare status: string;

    public getTitle(){
        return this.title;
    }
    public getAuthor(){
        return this.author;
    }
    public getDescription(){
        return this.description;
    }
    public getNumOfCopies(){
        return this.numOfCopies;
    }
    public returnBook(){
        this.numOfCopies += 1;
    }
    public borrowBook(){
        if(this.numOfCopies >= 1)
        this.numOfCopies -= 1;
    }
}

Book.init({
    // Model attributes are defined here
    bookID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    description: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    numOfCopies: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    imageLink: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    status:{
        type: DataTypes.STRING,
        defaultValue: 'Available'
    }
}, {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
    modelName: 'Book', // We need to choose the model name
    createdAt: false,

  // If don't want updatedAt
    updatedAt: false,
});

export = Book;
// export = db.sequelize.models.Book;