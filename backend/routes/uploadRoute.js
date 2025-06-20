import { Router } from "express";
import multer from "multer";
import { uploadOAS } from "../controllers/uploadController.js";
const router = Router();
const upload = multer();

router.post("/", upload.single("oas"), uploadOAS);
export default router;
