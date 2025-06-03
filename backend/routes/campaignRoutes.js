const express = require("express");
const router = express.Router();
const { createCampaign, getCampaigns, previewAudience } = require("../controllers/campaignController");
router.post("/", createCampaign);
router.get("/", getCampaigns);
router.post("/preview", previewAudience);
module.exports = router;
