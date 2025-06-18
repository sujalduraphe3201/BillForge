import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";



export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = verifyToken(token);
    req.user = payload as { userId: string; tenantId: string };
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
