import { Request, Response, Router } from "express";
import { auth } from "./auth";

const router = Router();

export const requestOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const data = await auth.api.forgetPasswordEmailOTP({
      body: { email },
    });

    if (!data.success)
      return res.status(500).json({ message: "Failed to send OTP" });

    return res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: String(error) });
  }
};

export default router;
