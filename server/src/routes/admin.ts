import { Router } from "express";
import { prisma } from "../../prisma/client";
import { authenticate } from "../middlewares/authmiddleware";



const adminRouter = Router();

adminRouter.get("/activity", authenticate, async (req, res) => {
    const tenantId = req.user?.tenantId
    const logs = await prisma.activityLog.findMany({
        where: { tenantId },
        orderBy: { timeStamp: "desc" },
        include: {
            user: {
                select: { email: true, name: true,}
            }
        }
    })
    res.json(logs)
})

export default adminRouter;