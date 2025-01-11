import express from "express";
import { protectPath } from "../utils/protectPath.js";
import { verifyToken } from '../utils/verifyUser.js';

import { followUnfollowUser, getSuggestedUsers, getUserProfile, updateUser, getAllUsers, getUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.get("/suggested", verifyToken, getSuggestedUsers);
router.put("/follow/:id", verifyToken, followUnfollowUser);
router.post("/update", verifyToken, updateUser);
router.get("/users",verifyToken, getAllUsers);
router.get('/:userId', getUser);

export default router;