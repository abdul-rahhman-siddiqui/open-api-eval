import express from "express";
import axios from "axios";
import Log from "../models/Log.js";
import Summary from "../models/Summary.js";

const router = express.Router();

router.post("/ask-llm", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    // 1. Fetch latest summary
    const latestSummary = await Summary.findOne().sort({ createdAt: -1 });
    console.log(latestSummary)
    if (!latestSummary) {
      return res.status(404).json({ error: "No summary found in database." });
    }

    // 2. Fetch latest 50 logs
    const logs = await Log.find().sort({ createdAt: -1 }).limit(50);

    // 3. Send both to Python RAG backend
    const pythonRes = await axios.post("http://localhost:8000/api/ask", {
      latestSummary,
      logs,
      question,
    });

    return res.status(200).json({ answer: pythonRes.data.answer });

  } catch (err) {
    console.error("RAG call failed:", err.message);
    return res.status(500).json({ error: "Failed to get LLM response." });
  }
});

export default router;
