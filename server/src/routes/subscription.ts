import { Router, Request, Response } from "express";
import { authenticate } from "../middlewares/authmiddleware";
import { prisma } from "../../prisma/client";
import { activityLog } from "../utils/ActivityLog";
const subscriptionRouter = Router();

subscriptionRouter.use(authenticate);

//  Get current subscription
subscriptionRouter.get("/subscription", async (req: Request, res: Response) => {
    const tenantId = req.user?.tenantId;
    if (!tenantId) {
        res.status(400).json({ error: "Missing tenant ID" });
        return;
    }

    const subscription = await prisma.subscription.findMany({
        where: { tenantId },
        include: { plan: true }
    });

    res.json(subscription);
});

// Create subscription
subscriptionRouter.post("/subscribe", async (req: Request, res: Response) => {
    const { planId } = req.body;
    const tenantId = req.user?.tenantId;

    if (!tenantId || !planId) {
        res.status(400).json({ error: "Missing tenantId or planId" });
        return
    }

    const existing = await prisma.subscription.findFirst({ where: { tenantId } });

    if (existing) {
        res.status(400).json({ message: "Tenant already subscribed" });
        return
    }

    const subscription = await prisma.subscription.create({
        data: {
            tenantId,
            planId,
            startDate: new Date(),
            status: "active"
        }
    });
    await activityLog({
        userId: req.user!.userId,
        tenantId: req.user!.tenantId,
        action: "Subscribed to plan",
        metadata: { planId }
    })

    res.status(201).json(subscription);
});

//  Cancel subscription
subscriptionRouter.post("/cancel", async (req: Request, res: Response) => {
    const tenantId = req.user?.tenantId;

    if (!tenantId) {
        res.status(400).json({ error: "Missing tenant ID" });
        return
    }

    const updated = await prisma.subscription.updateMany({
        where: { tenantId, status: "active" },
        data: { status: "cancelled", endDate: new Date() }
    });
    await activityLog({
        userId: req.user!.userId,
        tenantId: req.user!.tenantId,
        action: "Cancelled Subscription",
    })

    res.json({ success: true, updated });
});
export default subscriptionRouter;

