import express from 'express';
import bookController from '../controllers/bookController'
import middlewareController from '../controllers/middlewareController'
const router = express.Router();

router.get('/create', middlewareController.verifyToken ,middlewareController.verifyAdmin ,bookController.create);
router.post('/create', middlewareController.verifyToken ,middlewareController.verifyAdmin ,bookController.createBook);
router.post('/edit', middlewareController.verifyToken ,middlewareController.verifyAdmin ,bookController.edit);
router.get('/search' ,bookController.searchBook);
router.get('/:bookID', bookController.render);
router.get('/', bookController.books);

export = router;