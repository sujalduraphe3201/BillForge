import { Router } from "express";
import { prisma } from "../../prisma/client";
import { authenticate } from "../middlewares/authmiddleware";

const UsageRoutes = Router();
UsageRoutes.get("/usage", authenticate, async (req, res) => {
    const tenantId = req.user?.tenantId;
    const usage = await prisma.usage.findMany({
        where: { tenantId },
        orderBy: { timestamp: "desc" },
    });
    res.json(usage);
});

UsageRoutes.get("/usage-summary", authenticate, async (req, res) => {
    const tenantId = req.user?.tenantId
    const usage = await prisma.usage.groupBy({
        by: ['metric'],
        where: { tenantId },
        _sum: { amount: true }
    })
    res.json(usage)
})
export default UsageRoutes;