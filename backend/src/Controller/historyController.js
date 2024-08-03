const History = require("../model/History");
const addHistory = async (req, res) => {
  const { currencyCode } = req.body;
  const userId = req.user._id;

  const historyExists = await History.findOne({ user: userId, currencyCode });

  if (historyExists) {
    return res.status(400).json({ message: "Search already in history" });
  }

  const history = await History.create({ user: userId, currencyCode });

  res.status(201).json(history);
};

const getHistory = async (req, res) => {
  const userId = req.user._id;

  const history = await History.find({ user: userId })
    .limit(5)
    .sort({ createdAt: -1 });

  res.json(history);
};

module.exports = { addHistory, getHistory };
