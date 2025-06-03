const express = require("express");
const router = express.Router();
const { suggestMessage } = require("../controllers/aiController");
router.post("/message", suggestMessage);
module.exports = router;
