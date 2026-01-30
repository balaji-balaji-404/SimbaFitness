import asyncHandler from "express-async-handler";
import CalorieLog from "../models/CalorieLog.js";

// @desc    Add a calorie log
// @route   POST /api/calories
// @access  Private
const createCalorieLog = asyncHandler(async (req, res) => {
    const { foodItem, calories, mealType, protein, carbs, fats, date, weight } = req.body;

    const calorieLog = await CalorieLog.create({
        user: req.user._id,
        foodItem,
        calories,
        mealType,
        protein,
        carbs,
        fats,
        date: date || new Date(), // Defaults to now, but can be passed in body if needed
        weight,
    });

    res.status(201).json(calorieLog);
});

// @desc    Get logs for a specific date (default today)
// @route   GET /api/calories
// @access  Private
const getDailyLogs = asyncHandler(async (req, res) => {
    const { date } = req.query;
    const queryDate = date ? new Date(date) : new Date();

    // Create start and end of the day
    const startOfDay = new Date(queryDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999));

    const logs = await CalorieLog.find({
        user: req.user._id,
        date: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ date: -1 });

    // Calculate total calories
    const totalCalories = logs.reduce((acc, log) => acc + log.calories, 0);

    res.json({ logs, totalCalories });
});

// @desc    Delete a calorie log
// @route   DELETE /api/calories/:id
// @access  Private
const deleteCalorieLog = asyncHandler(async (req, res) => {
    const log = await CalorieLog.findById(req.params.id);

    if (log) {
        if (log.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error("User not authorized");
        }
        await log.deleteOne();
        res.json({ message: "Log removed" });
    }
});

// @desc    Get user's calorie logs for tracker
// @route   GET /api/calories/my-logs
// @access  Private
const getMyCalorieLogs = asyncHandler(async (req, res) => {
    const logs = await CalorieLog.find({ user: req.user._id }).sort({ date: 1 });
    res.json(logs);
});

export { createCalorieLog, getDailyLogs, deleteCalorieLog, getMyCalorieLogs };
