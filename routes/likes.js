const express = require("express");
const router = express.Router();
const likeController= require('../controllers/likes');

router.get('/',likeController.getLikes);
router.post('/',likeController.addLike);
router.delete('/',likeController.deleteLike);

module.exports = router;