import express from "express";
import { protectPath } from "../utils/protectPath.js"
import { deleteNotifications, getNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectPath, getNotifications);
router.delete("/", protectPath, deleteNotifications);

export default router;