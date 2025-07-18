import { Router } from "express";
import { authenticate } from "../middlewares/authmiddleware";
import { prisma } from "../../prisma/client";

const billingrouter = Router();

billingrouter.get("/history", authenticate, async (req, res) => {
    const tenantId = req.user?.tenantId;

    const invoices = await prisma.invoices.findMany({
        where: { tenantId },
        orderBy: { date: "desc" }
    });

    res.json(invoices);
});

export default billingrouter