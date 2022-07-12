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

class uploadBookImg {
  storage = multer.diskStorage({
    destination: (req: Request, file: any, callBack: any) => {
      callBack(null, path.join(__dirname, '..', '..', 'public', 'images', 'bookImages'));  //The directory that save an avatar
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


}
export = new uploadBookImg