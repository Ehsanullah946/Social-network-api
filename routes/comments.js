const express = require("express");
const router = express.Router();
const commentController = require('../controllers/comments');

router.get("/",commentController.getComments);
router.post("/",commentController.addComments);

module.exports = router;