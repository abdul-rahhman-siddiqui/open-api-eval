import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import uploadRoute from "./routes/uploadRoute.js";
import reportRoute from "./routes/reportRoute.js";
import clearRoute from "./routes/clearRoute.js";
import ragRoutes from "./routes/ragRoutes.js";
import { spawn } from "child_process";

// === START FLASK SERVER ===
const flaskProcess = spawn('python', [
  'C:\\Users\\Admin\\Desktop\\openapi\\rest-api-evaluator\\llm-rag-service\\app.py'
], {
  shell: true
});

flaskProcess.stdout.on('data', (data) => {
  console.log(`[Flask stdout]: ${data}`);
});

flaskProcess.stderr.on('data', (data) => {
  console.error(`[Flask stderr]: ${data}`);
});

flaskProcess.on('close', (code) => {
  console.log(`[Flask exited] with code ${code}`);
});

process.on('SIGINT', () => {
  flaskProcess.kill();
  process.exit();
});
process.on('SIGTERM', () => {
  flaskProcess.kill();
  process.exit();
});
// === END FLASK SERVER ===

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/upload", uploadRoute);
app.use("/api/report", reportRoute);
app.use("/api/clear", clearRoute);
app.use("/api/rag", ragRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server @${PORT}`)))
  .catch(console.error);
