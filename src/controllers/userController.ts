import db from "../config/db"
const bcrypt = require('bcrypt');
import express, {
  Application,
  Request,
  Response
} from 'express';
import Person from '../models/Person';
class userController {

  changePassword = async (req: Request, res: Response) => {
    try {
      if (!req.body.currentPassword || !req.body.newPassword || !req.body.newPasswordAgain) {
        return res.json({
          message: "Need to fill in form password"
        });
      }

      let data: any = await db.sequelize.query(`select email,password from users where email="${req.body.email}" `);
      data = data[0];
      //Check password
      const isCurrentPassword = await bcrypt.compare(req.body.currentPassword, data[0].password);

      if (!isCurrentPassword) {
        res.status(400).json({
          message: "change password failed...",
        })
      } else if (req.body.newPassword === req.body.newPasswordAgain) {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(req.body.newPassword, salt);
        await req.currentUser.changePassword(req, newPassword);
        res.redirect('/auth/login');
      } else {
        res.status(400).json({
          message: "change password failed...",
        })
      }

    } catch (error) {
      res.status(400).json({
        message: "change password failed...",
        error
      })
    }
  }

  getHomePageUser = (req: Request, res: Response) => {
    // res.send(req.currentUser);
    if (req.currentUser.getIsAdmin()) {

      req.currentUser.getHomePageUser(req).then((userData: any[]) => {
          userData = userData[1];
          const loginUser = {
            emailLogin: req.user.email,
            isAdminLogin: req.user.isAdmin,
          };
          res.render("user.ejs", {
            userData: userData,
            loginUser: loginUser
          });
        })
        .catch((err: any) => {
          res.status(400).json({
            message: "fail",
          });
        });
    } else {
      req.currentUser.getHomePageUser(req).then((userData: any) => {
          userData = userData[1];
          const loginUser = {
            emailLogin: req.user.email,
            isAdminLogin: req.user.isAdmin,
          };

          res.render("userNotAdmin.ejs", {
            userData: userData,
            loginUser: loginUser
          });
        })
        .catch((err: any) => {
          res.status(400).json({
            message: "fail",
          });
        });
    }

  };

  createNewUser = async (req: Request, res: Response) => {
    try {
      // console.log(req.body);
      const emailArr = [];
      const data: any = await db.sequelize.query("select email from users");
      const dataEmail = data[0];
      for (const email of dataEmail) emailArr.push(email.email);

      if (emailArr.includes(req.body.email)) {
        res.status(400).json({
          message: "Create new user fail...",
        });
      } else {
        //Hashing the password that user inputed
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        await req.currentUser.createNewUser(req, password);
        res.redirect("/user");
      }
    } catch (error) {
      res.status(400).json({
        message: "Create new user fail...",
        error
      });
    }
  };

  editUser = async (req: Request, res: Response) => {
    try {
      await req.currentUser.editUser(req);
      res.redirect("/user");
    } catch (error) {
      res.json(404).json({
        message: "Edit User Fail...",
        error,
      });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      if (req.currentUser.getIsAdmin()) req.currentUser.deleteUser(req);
      res.redirect("/user");
    } catch (error) {
      res.status(400).json({
        message: "Delete fail !",
        error: error,
      });
    }
  };

  getUsersByEmail = (req: Request, res: Response) => {
    req.currentUser.getUsersByEmail(req.body.emailSearch).then((userData: any) => {
      userData = userData[0];
      const loginUser = {
        emailLogin: req.user.email,
        isAdminLogin: req.user.isAdmin,
      };
      res.render("user.ejs", {
        userData: userData,
        loginUser: loginUser
      });
    }).catch((err: any) => {
      res.status(400).json({
        message: "fail",
      });
    });
  };

}
module.exports = new userController;