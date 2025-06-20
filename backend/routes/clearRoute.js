import { Router } from "express";
import Log from "../models/Log.js";
import Summary from "../models/Summary.js";

const router = Router();

router.delete("/", async (req, res) => {
  try {
    await Log.deleteMany({});
    await Summary.deleteMany({});
    res.json({ message: "All logs and summaries cleared!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
