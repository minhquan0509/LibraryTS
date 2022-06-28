import express from 'express';
import borrowController from '../controllers/borrowController'
import middlewareController from '../controllers/middlewareController'
const router = express.Router();

router.post('/create', middlewareController.verifyToken, middlewareController.verifyAdmin, borrowController.create);
router.post('/edit', middlewareController.verifyToken, middlewareController.verifyAdmin, borrowController.edit);
router.delete('/:loanID', middlewareController.verifyToken, middlewareController.verifyAdmin, borrowController.delete);
router.get('/', middlewareController.verifyToken, borrowController.borrow);

export = router;