import express from 'express';
import bookController from '../controllers/bookController'
import middlewareController from '../controllers/middlewareController'
import uploadBookImgController from '../controllers/uploadBookImgController';
const router = express.Router();

router.get('/create', middlewareController.verifyToken, middlewareController.requireLogin, middlewareController.verifyAdmin, bookController.create);
router.post('/create', middlewareController.verifyToken, middlewareController.requireLogin, middlewareController.verifyAdmin, uploadBookImgController.upload.single('imageLink'), bookController.createBook);
router.post('/edit', middlewareController.verifyToken, middlewareController.requireLogin, middlewareController.verifyAdmin, bookController.edit);
router.get('/search', bookController.searchBook);
router.get('/:ISBN', bookController.render);
router.get('/', bookController.books);

export = router;