import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

// Extend Request interface to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; tenantId: string };
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
        const payload = verifyToken(token);
        req.user = payload as { userId: string; tenantId: string };
        next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
};
