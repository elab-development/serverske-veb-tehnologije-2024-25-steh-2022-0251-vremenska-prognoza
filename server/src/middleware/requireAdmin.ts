import { fromNodeHeaders } from "better-auth/node";
import { NextFunction, Request, Response } from "express";
import { auth } from "../controllers/auth";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: "user" | "admin";
  };
}

export const requireAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    type UserWithRole = typeof session.user & { role: "user" | "admin" };
    const userRole = (session.user as UserWithRole).role;

    if (userRole !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = {
      id: session.user.id,
      role: userRole,
    };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
