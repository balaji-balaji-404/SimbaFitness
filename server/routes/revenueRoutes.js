import express from "express";
const router = express.Router();
import { getRevenueStats } from "../controllers/revenueController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.get("/", protect, admin, getRevenueStats);

export default router;
