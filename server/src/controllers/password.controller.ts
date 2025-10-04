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

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ message: "Email and OTP are required" });

  try {
    const data = await auth.api.checkVerificationOTP({
      body: {
        email,
        otp,
        type: "forget-password",
      },
    });

    if (!data.success) return res.status(400).json({ message: "Invalid OTP" });

    return res.json({ message: "OTP verified" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: String(error) });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, password } = req.body;
  if (!email || !otp || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const data = await auth.api.resetPasswordEmailOTP({
      body: { email, otp, password },
    });

    if (!data.success)
      return res.status(400).json({ message: "Failed to reset password" });

    return res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: String(error) });
  }
};

export default router;
