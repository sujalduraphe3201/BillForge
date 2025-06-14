import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import { authenticate } from "../middlewares/authmiddlewares";

const router = Router();

router.use(authenticate);

router.get("/subscription", async (req, res) => {
    const tenantId = req.user?.tenantId;
    const subscription = await prisma.subscription.findMany({
        where: { tenantId },
        include: { plan: true }
    });
    res.json(subscription);
});

router.post("/subscribe", async (req, res) => {
    const { planId, tenantId } = req.body;
    const existing = await prisma.subscription.findFirst({ where: { tenantId } });

    if (existing) {
        return res.status(400).json({ message: "Tenant Already Exists" });
    }

    const subscription = await prisma.subscription.create({
        data: {
            tenantId,
            planId,
            startDate: new Date(),
            status: "active"
        }
    });

    res.status(201).json(subscription);
});

router.post("/cancel", async (req: Request, res: Response) => {
    const tenantId = req.user?.tenantId;

    const updated = await prisma.subscription.updateMany({
        where: { tenantId, status: "active" },
        data: { status: "cancelled", endDate: new Date() }
    });

    res.json({ success: true, updated });
});

export default router;
