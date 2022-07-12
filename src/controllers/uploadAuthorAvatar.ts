import multer from 'multer';
import express, {
  Application,
  Request,
  Response
} from 'express';
import Person from '../models/Person';
import db from "../config/db";
const path = require('path');
const fs = require('fs');

class uploadAuthorAvatar {
  storage = multer.diskStorage({
    destination: (req: Request, file: any, callBack: any) => {
      callBack(null, path.join(__dirname, '..', '..', 'public', 'images', 'authorImages'));  //The directory that save an avatar
    },
    filename: (req: Request, file: any, callBack: any) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });

  fileFilter = (req: Request, file: any, callBack: any) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callBack(null, true);
    } else {
      callBack(new Error('Unsupported File !!'), false);
    }
  }

  upload = multer({
    storage: this.storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: this.fileFilter
  });

  changeAuthorAvatar = async (req: Request, res: Response) => {
    try {
      if (!req.file) res.status(404).json({
        message: "Image not uploaded..."
      })
      else {
        let currentAvatar: any = await db.sequelize.query(`select authorAvatar from authors where authorName="${req.body.authorName}"`);
        currentAvatar = currentAvatar[0][0];
        if (currentAvatar.authorAvatar) {
          fs.unlink(path.join(__dirname, '..', '..', 'public', 'images', 'authorImages', `${currentAvatar.authorAvatar}`), (error: any) => {
            if (error) res.status(404).json({
              message: "Remove file fail...",
              error
            })
          })
        }
        await db.sequelize.query(`update authors set authorAvatar='${req.file.filename}' where authorName="${req.body.authorName}"`);
        res.redirect("/author");
      }
    } catch (error) {
      res.status(404).json({
        message: "Upload fail...",
        error
      })
    }
  }

}
export = new uploadAuthorAvatar