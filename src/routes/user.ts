const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");
const uploadAvatarController = require("../controllers/uploadAvatarController");


router.get("/", middlewareController.verifyToken, userController.getHomePageUser);
router.post('/change-password', middlewareController.verifyToken, userController.changePassword)
router.post("/email", middlewareController.verifyToken, userController.getUsersByEmail);
router.post("/create-new-user", middlewareController.verifyToken, middlewareController.verifyAdmin, userController.createNewUser);
router.post("/edit", middlewareController.verifyToken, userController.editUser);
router.post("/delete-user", middlewareController.verifyToken, middlewareController.verifyAdmin, userController.deleteUser);
router.post("/change-avatar", middlewareController.verifyToken, uploadAvatarController.upload.single('avatar'), uploadAvatarController.changeAvatar);
export = router;
