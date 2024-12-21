
import express from "express";
import { getMe, login, logout, signup, google } from "../controllers/auth.controller.js";
import { protectPath } from "../utils/protectPath.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get("/getme", verifyToken, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google)
router.post("/logout", logout);

export default router;