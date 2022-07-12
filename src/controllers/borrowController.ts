import express, {
    Application,
    Request,
    Response
} from 'express';
import {
    Sequelize,
    DataTypes,
    Model,
    Op
} from "sequelize";
import db from "../config/db"
import Book from '../models/Book'
import Loan from '../models/Loan'
import User from '../models/User'

class BorrowController {
    borrow = async (req: Request, res: Response) => {
        try {
            console.log(req.user.isAdmin);

            const isAdmin = req.user.isAdmin;
            // const isAdmin = req.cookies.user.isAdmin;
            if (isAdmin === true) {

                const loans = await Loan.findAll();
                const users = await User.findAll();
                const books = await Book.findAll();
                return res.render('borrow', {
                    loans,
                    isAdmin,
                    users,
                    books
                });
            } else {
                const loans = await Loan.findAll({
                    where: {
                        userEmail: req.user.email
                    }
                });
                return res.render('borrow', {
                    loans,
                    isAdmin: false,
                    users: [],
                    books: []
                });
            }
        } catch (err) {
            console.log(err);
            res.status(400).json('There was an error');
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const book = await Book.findOne({
                where: {
                    ISBN: req.body.ISBN
                }
            })

            const quantity = book?.getNumOfCopies();
            if (quantity === undefined) return res.json('There are some error');
            if (quantity < 1) {
                return res.json('Out of stocked!')
            } else {

                const loan = await Loan.create({
                    userEmail: req.body.email,
                    ISBN: req.body.ISBN,
                    issueDate: req.body.issueDate,
                    dueDate: req.body.dueDate,
                    // returnDate: req.body.returnDate,
                    status: 'progressing'
                })
                // await db.sequelize.query(`UPDATE books set numOfCopies = numOfCopies - 1 where ISBN = ${req.body.ISBN}`)
                book?.borrowBook();

                await book?.save();
                res.redirect('/borrow');
            }
        } catch (error) {
            console.log(error);
            res.status(400).json('There was an error');
        }
    }

    edit = async (req: Request, res: Response) => {
        try {
            // console.log(req.body.returnDate === '');

            const oldLoan = await Loan.findOne({
                where: {
                    ID: req.body.ID
                }
            });
            if (req.body.returnDate === '') {
                const loan = await db.sequelize.query(`UPDATE loans set issueDate = '${req.body.issueDate}', dueDate = '${req.body.dueDate}', status = '${req.body.status}' where ID = ${req.body.ID}`);
            } else {
                await db.sequelize.query(`UPDATE loans set issueDate = '${req.body.issueDate}', dueDate = '${req.body.dueDate}', returnDate = '${req.body.returnDate}', status = '${req.body.status}' where ID = ${req.body.ID}`);
            }
            const newLoan = new Loan({
                ID: req.body.ID,
                userEmail: req.body.userEmail,
                ISBN: req.body.ISBN,
                issueDate: req.body.issueDate,
                dueDate: req.body.dueDate,
                returnDate: req.body.returnDate,
                status: req.body.status
            })

            // await oldLoan?.save();
            console.log(oldLoan?.getStatus(), newLoan.getStatus());
            // await db.sequelize.query(`UPDATE loans set issueDate = '${req.body.issueDate}', dueDate = '${req.body.dueDate}', returnDate = '${req.body.returnDate}', status = '${req.body.status}' where ID = ${req.body.ID}`);
            if (oldLoan?.getStatus() === 'progressing' && newLoan.getStatus() === 'done') {
                const book = await Book.findOne({
                    where: {
                        ISBN: oldLoan.getISBN()
                    }
                })
                await book?.returnBook();
                await book?.save();
            }

            // await db.sequelize.query(`UPDATE books set numOfCopies = numOfCopies + 1 where ISBN = ${req.body.ISBN}`);

            res.status(200).json('Edited');
        } catch (error) {
            console.log(error);
            res.status(400).json('There was an error');
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const loan = await Loan.findOne({
                // attributes: ['ISBN'],
                where: {
                    ID: req.params.loanID
                }
            })
            const ISBN = loan?.getISBN();
            if(loan?.getStatus() !== 'done'){
                await db.sequelize.query(`UPDATE books set numOfCopies = numOfCopies + 1 where ISBN = ${ISBN}`);
            }
            await Loan.destroy({
                where: {
                    ID: req.params.loanID
                }
            });
        } catch (error) {
            console.log(error);
            res.status(400).json('There was an error');

        }
        res.status(200).redirect('/borrow');
    }
}

export = new BorrowController;