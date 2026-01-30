import express from "express";
const router = express.Router();
import { createEnquiry, getEnquiries } from "../controllers/enquiryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(createEnquiry).get(protect, admin, getEnquiries);

export default router;
