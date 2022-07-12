const express = require("express");
const router = express.Router();
import authorController from '../controllers/authorController'
import uploadAuthorAvatar from '../controllers/uploadAuthorAvatar'

router.get('/', authorController.authors);
router.get('/:authorName', authorController.details);
router.post('/avatar', uploadAuthorAvatar.upload.single('authorAvatar'), uploadAuthorAvatar.changeAuthorAvatar);

export = router;