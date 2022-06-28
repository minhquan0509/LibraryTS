const express = require('express');
const router = express.Router();
import siteController from '../controllers/siteController';

router.get('/about', siteController.about);
router.get('/', siteController.home);

export = router;