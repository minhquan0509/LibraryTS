import {Application, Request, Response} from 'express';
import { Sequelize, DataTypes, Model, Op } from "sequelize";
import db from "../config/db"
import Book from '../models/Book'
class bookController{
    public books = async (req: Request, res: Response) => {
        try {
            
            let data = await Book.findAll();
            // data.forEach((element: any) => console.log((element as Book).getTitle()));
            // const book = new Book({bookID: 4, title: 'Tenki no ko', author: 'Shinkai Makoto', description: '', numOfCopies: 4, imageLink: ''})
            
            res.render('book',{data: data});
        } catch (error) {
            res.send(error);
        }
    }

    public render = async (req: Request, res: Response) => {
        try {
            let isAdmin;
            if(req.cookies.user.isAdmin === true){
                isAdmin = true;
            } else{
                isAdmin = false;
            }
            let book = await Book.findByPk(req.params.bookID);
            res.render('details',{book, isAdmin});
        } catch (error) {
            res.send(error);
        }
    }

    public create = (req: Request, res: Response) =>{
        res.render('createBook');
    }

    public createBook = async (req: Request, res: Response) =>{
        try {     
            const book = await Book.create({
                bookID: req.body.bookID,
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                numOfCopies: req.body.numOfCopies,
                imageLink: req.body.imageLink,
                status: req.body.status,
            });
            
            res.redirect('/books');
        } catch (error) {
            res.send(error);
        }
    }

    public searchBook = async (req: Request, res: Response) => {
        try {         
            const search = req.query.search;
            const data = await Book.findAll({
                // where:{
                //     title: {
                //         [Op.like]: `%${title}%`
                //     }
                // }
                //where title like '%search% or author like '%search%' or description like '%search%'
                where:{
                    [Op.or]: [
                        {
                            title: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            author: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            description: {
                                [Op.like]: `%${search}%`
                            }
                        }
                    ]
                    
                }
            })
            res.status(200).render('book',{data});
        } catch (error) {
            res.send(error);
        }
    }

    public edit = async(req: Request, res: Response) => {
        try {
            const numOfCopies = req.body.numOfCopies;
            await db.sequelize.query(`UPDATE books set numOfCopies = ${numOfCopies} where bookID = ${req.body.bookID}`)
            res.redirect(`/books/${req.body.bookID}`);
        } catch (error) {
            res.send(error);
        }
    }

}

export = new bookController