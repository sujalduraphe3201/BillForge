import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import prisma from "../../prisma/client";
import { generateToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, tenantId } = req.body;

    if (!name || !email || !password || !tenantId) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }

    try {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            res.status(409).json({ error: "Email already in use" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, tenantId },
        });

        const token = generateToken(user.id, user.tenantId);

        res.status(201).json({
            user: { id: user.id, name: user.name, email: user.email },
            token,
        });
    } catch (err) {
        console.error("Signup Error:", err);
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const token = generateToken(user.id, user.tenantId);

        res.json({
            user: { id: user.id, name: user.name, email: user.email },
            token,
        });
    } catch (err) {
        console.error("Login Error:", err);
        next(err);
    }
};
