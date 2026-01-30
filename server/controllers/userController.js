import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            role: user.role,
            token: generateToken(user._id),
            branch: user.branch,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, branch } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        branch,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            role: user.role,
            token: generateToken(user._id),
            branch: user.branch,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc    Create a new user (Admin)
// @route   POST /api/users/add
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, branch, role, subscriptionPlan, subscriptionEndDate, dob, height, weight, age } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        branch,
        role: role || "member",
        isAdmin: role === "admin",
        subscriptionPlan,
        subscriptionEndDate,
        isActive: !!subscriptionPlan,
        dob,
        height,
        weight,
        age,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            branch: user.branch,
            role: user.role,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            role: user.role,
            branch: user.branch,
            subscriptionPlan: user.subscriptionPlan,
            subscriptionEndDate: user.subscriptionEndDate,
            // Add other profile fields as needed
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        res.json({ message: "User removed" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;
        user.role = req.body.role || user.role;
        user.branch = req.body.branch || user.branch;
        user.subscriptionPlan = req.body.subscriptionPlan || user.subscriptionPlan;
        user.subscriptionEndDate = req.body.subscriptionEndDate || user.subscriptionEndDate;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            branch: updatedUser.branch,
            subscriptionPlan: updatedUser.subscriptionPlan,
            subscriptionEndDate: updatedUser.subscriptionEndDate,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export {
    authUser,
    registerUser,
    getUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    createUser,
};
