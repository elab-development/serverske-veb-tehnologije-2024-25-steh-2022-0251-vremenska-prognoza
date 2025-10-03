import { Router } from "express";
import {
  requestOtp,
  resetPassword,
  verifyOtp,
} from "../controller/password.controller";

const router = Router();

router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
