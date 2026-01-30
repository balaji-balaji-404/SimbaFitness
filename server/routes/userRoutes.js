import express from "express";
const router = express.Router();
import {
    authUser,
    registerUser,
    getUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    createUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/login", authUser);
router.post("/add", protect, admin, createUser);
router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/profile").get(protect, getUserProfile);
router
    .route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;
