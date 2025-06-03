const Campaign = require("../models/Campaign");
const CommunicationLog = require("../models/CommunicationLog");
const Customer = require("../models/Customer");
const buildMongoQuery = require("../utils/buildMongoQuery");

exports.previewAudience = async (req, res) => {
  try {
    const query = buildMongoQuery(req.body.rules);
    const customers = await Customer.find(query);
    res.json({ audienceSize: customers.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCampaign = async (req, res) => {
  try {
    const { name, rules, createdBy, message } = req.body;
    const campaign = new Campaign({ name, rules, createdBy, message });
    await campaign.save();

    const query = buildMongoQuery(rules);
    const customers = await Customer.find(query);

    const logs = customers.map(c => ({
      campaignId: campaign._id,
      customerId: c._id,
      message: message.replace("{name}", c.name),
      status: Math.random() < 0.9 ? "SENT" : "FAILED"
    }));
    await CommunicationLog.insertMany(logs);

    res.status(201).json({ campaign, audienceSize: customers.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    const logs = await CommunicationLog.find();
    res.json({ campaigns, logs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
