import mongoose from "mongoose";

const calorieLogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        foodItem: {
            type: String,
            required: true,
        },
        calories: {
            type: Number,
            required: true,
        },
        weight: { type: Number }, // in kg, optional for progression tracking
        protein: { type: Number }, // in grams
        carbs: { type: Number }, // in grams
        fats: { type: Number }, // in grams
        mealType: {
            type: String,
            enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CalorieLog = mongoose.model("CalorieLog", calorieLogSchema);

export default CalorieLog;
