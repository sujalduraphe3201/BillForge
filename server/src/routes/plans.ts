import { Router } from "express";
import { prisma } from "../../prisma/client";
const router = Router();

router.get("/plans", async (req, res) => {
    const plans = await prisma.plan.findMany();
    res.json(plans);
});

export default router;
