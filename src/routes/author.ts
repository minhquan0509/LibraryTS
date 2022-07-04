const express = require("express");
const router = express.Router();
import authorController from '../controllers/authorController'


router.get('/', authorController.authors);

export = router;