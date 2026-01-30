import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

import connectDB from "./config/db.js";

connectDB();

import userRoutes from "./routes/userRoutes.js";
import calorieRoutes from "./routes/calorieRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import revenueRoutes from "./routes/revenueRoutes.js";

// Routes
app.use("/api/users", userRoutes);
app.use("/api/calories", calorieRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/revenue", revenueRoutes);

app.get("/", (req, res) => {
    res.send("Simba Fitness API is running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
