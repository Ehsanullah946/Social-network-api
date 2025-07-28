const express = require("express");
const router = express.Router();
const userController = require('../controllers/users');

router.get("/find/:userId", userController.getUser);
router.put("/", userController.updateUser);

module.exports = router;