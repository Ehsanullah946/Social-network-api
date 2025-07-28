const express = require("express");
const router = express.Router();
const relationshipController= require('../controllers/relationships');

router.get('/',relationshipController.getRelationship);
router.post('/',relationshipController.addRelationship);
router.delete('/',relationshipController.deleteRelationship);

module.exports = router;