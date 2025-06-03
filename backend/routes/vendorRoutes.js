const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/send", async (req, res) => {
  const { logId } = req.body;
  // Simulate delivery result
  const status = Math.random() < 0.9 ? "SENT" : "FAILED";
  // Simulate async delivery receipt callback
  setTimeout(async () => {
    await axios.post("http://localhost:5000/api/delivery/receipt", { logId, status });
  }, Math.random() * 1000 + 500);
  res.json({ status });
});

module.exports = router;
