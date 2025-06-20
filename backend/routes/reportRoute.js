import { Router } from "express";
import { getSummary, getLogs } from "../controllers/reportController.js";
const router = Router();

router.get("/summary/:id", getSummary);
router.get("/logs", getLogs);

export default router;
