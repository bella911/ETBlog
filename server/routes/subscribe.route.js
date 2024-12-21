import express from "express";
import {createSubscriber, getSubscriber, deleteSubscriber} from "../controllers/subscribe.controller.js"

const router = express.Router();

router.post("/subscribe", createSubscriber);
router.get("/getSubscriber", getSubscriber);
router.get("/delete/:id", deleteSubscriber);


export default router;