import express from "express"
import { pay, verifyPay } from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/pay", pay);
router.get("/verify-pay/:txId", verifyPay)

export default router