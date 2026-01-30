import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        age: { type: Number },
        dob: { type: Date },
        role: { type: String, default: "member" }, // member, admin, trainer
        branch: { type: String, required: true }, // Coimbatore, Pollachi, Udumalaipet
        // Physical Stats
        height: { type: Number }, // in cm
        weight: { type: Number }, // in kg
        gender: { type: String },
        // Subscription Details
        subscriptionPlan: { type: String }, // e.g., "3 Months", "1 Year"
        subscriptionStartDate: { type: Date },
        subscriptionEndDate: { type: Date },
        isActive: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
