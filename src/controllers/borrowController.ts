import express, {Application, Request, Response} from 'express';
import { Sequelize, DataTypes, Model, Op } from "sequelize";
import db from "../config/db"
import Book from '../models/Book'
import Loan from '../models/Loan'
import User from '../models/User'

class BorrowController {
    borrow = async (req: Request, res: Response) => {
        try{
            console.log(req.user.isAdmin);
            
            const isAdmin = req.user.isAdmin;
            if(isAdmin){

                const loans = await Loan.findAll();
                const users = await User.findAll();
                const books = await Book.findAll();
                return res.render('borrow',{loans, isAdmin, users, books});
            }
            else{
                const loans = await Loan.findAll({
                    where:{
                        userEmail: req.user.email
                    }
                });
                return res.render('borrow',{loans, isAdmin: false, users : [], books : []});
            }
        } catch(err){
            res.send(err);
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const book = await Book.findOne({
                where: {
                    bookID: req.body.bookID
                }
            })
            
            const quantity = book?.getNumOfCopies();
            if(quantity === undefined) return res.json('There are some error');
            if(quantity < 1){ return res.json('Out of stocked!')}
            else{
                
                const loan = await Loan.create({
                    userEmail: req.body.email,
                    bookID: req.body.bookID,
                    issueDate: req.body.issueDate,
                    dueDate: req.body.dueDate,
                    // returnDate: req.body.returnDate,
                    status: 'progressing'
                })
                // await db.sequelize.query(`UPDATE books set numOfCopies = numOfCopies - 1 where bookID = ${req.body.bookID}`)
                book?.borrowBook();

                await book?.save();
                res.redirect('/borrow');
            }
        } catch (error) {
            res.send(error);
        }
    }

    edit = async (req: Request, res: Response) => {
        try {
            if(req.body.returnDate === null){
                const loan = await db.sequelize.query(`UPDATE loans set issueDate = '${req.body.issueDate}', dueDate = '${req.body.dueDate}', returnDate = '${req.body.returnDate}', status = '${req.body.status}' where ID = ${req.body.ID}`);
            } else{
                const loan = await db.sequelize.query(`UPDATE loans set issueDate = '${req.body.issueDate}', dueDate = '${req.body.dueDate}', status = '${req.body.status}' where ID = ${req.body.ID}`);
            }
            if(req.body.status === 'done')
            await db.sequelize.query(`UPDATE books set numOfCopies = numOfCopies + 1 where bookID = ${req.body.bookID}`);
            res.status(200);
        } catch (error) {
            res.send(error);
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const loan = await Loan.findOne({
                attributes: ['bookID'],
                where:{
                    ID: req.params.loanID
                }
            })
            const bookID = loan?.getBookID();
            console.log(bookID);
            await db.sequelize.query(`UPDATE books set numOfCopies = numOfCopies + 1 where bookID = ${bookID}`);
            await Loan.destroy({
                where:{
                    ID: req.params.loanID
                }
            });
        } catch (error) {
            res.send(error);
        }
        res.redirect('/borrow');
    }
}

export = new BorrowController;