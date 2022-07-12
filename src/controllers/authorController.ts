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
        let isAdmin: boolean;
            if (req.cookies.user) {
                if (req.cookies.user.isAdmin === true) {
                    isAdmin = true;
                } else isAdmin = false;
            } else isAdmin = false;
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
        if(!author){
            return res.render('404notFound');
        }
        return res.render('authorDetails', {author, books, isAdmin});
    }
}

export = new authorController;
