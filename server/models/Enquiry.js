import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        branch: { type: String, required: true },
        message: { type: String },
        status: {
            type: String,
            enum: ["New", "Contacted", "Closed"],
            default: "New",
        },
    },
    {
        timestamps: true,
    }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
