import { Router } from "express";
import { requestOtp } from "../controller/password.controller";

const router = Router();

router.post("/request-otp", requestOtp);

export default router;
