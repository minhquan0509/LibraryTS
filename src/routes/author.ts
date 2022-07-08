const express = require("express");
const router = express.Router();
import authorController from '../controllers/authorController'


router.get('/', authorController.authors);
router.get('/:authorName', authorController.details);

export = router;