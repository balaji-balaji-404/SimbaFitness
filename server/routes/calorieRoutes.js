import express from "express";
const router = express.Router();
import {
    createCalorieLog,
    getDailyLogs,
    deleteCalorieLog,
    getMyCalorieLogs,
} from "../controllers/calorieController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createCalorieLog).get(protect, getDailyLogs);
router.route("/my-logs").get(protect, getMyCalorieLogs);
router.route("/:id").delete(protect, deleteCalorieLog);

export default router;
