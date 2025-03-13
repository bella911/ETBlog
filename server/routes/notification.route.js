import express from "express";
// import { protectPath } from "../utils/protectPath.js"
import { deleteNotifications, getNotifications } from "../controllers/notification.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", verifyToken, getNotifications);
router.delete("/", verifyToken, deleteNotifications);

export default router;