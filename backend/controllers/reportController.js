import Summary from "../models/Summary.js";
import Log from "../models/Log.js";

export const getSummary = async (req, res) => {
  const summary = await Summary.findById(req.params.id);
  if (!summary) return res.status(404).json({ msg: "Not found" });
  res.json(summary);
};

export const getLogs = async (req, res) => {
  const logs = await Log.find().sort({ createdAt: -1 }).limit(500); // cap
  res.json(logs);
};
