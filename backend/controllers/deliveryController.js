const CommunicationLog = require("../models/CommunicationLog");

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { logId, status } = req.body;
    await CommunicationLog.findByIdAndUpdate(logId, { status });
    res.json({ message: "Status updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
