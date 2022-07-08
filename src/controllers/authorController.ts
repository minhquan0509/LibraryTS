import {Application, Request, Response} from 'express';
import { Sequelize, DataTypes, Model, Op } from "sequelize";
import Author from '../models/Author';
import db from "../config/db"
import Book from '../models/Book';

class authorController{
    public authors = async(req: Request, res: Response) => {
        const authors = await Author.findAll();
        res.render('authors', {authors});
    }

    public details = async (req: Request, res: Response) => {
        // console.log(req.params.authorName);
        const author = await Author.findOne({
            where: {
                authorName: req.params.authorName
            }
        })
        const books = await Book.findAll({
            where:{
                author: req.params.authorName
            }
        })
        res.render('authorDetails', {author, books});
    }
}

export = new authorController;
