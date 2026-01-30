import asyncHandler from "express-async-handler";
import Enquiry from "../models/Enquiry.js";

// @desc    Create a new enquiry
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = asyncHandler(async (req, res) => {
    const { name, email, branch, message } = req.body;

    const enquiry = await Enquiry.create({
        name,
        email,
        branch,
        message,
    });

    res.status(201).json(enquiry);
});

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
const getEnquiries = asyncHandler(async (req, res) => {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    res.json(enquiries);
});

export { createEnquiry, getEnquiries };
