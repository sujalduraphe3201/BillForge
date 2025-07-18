import { prisma } from "../../prisma/client";
export const TrackUsage = async (tenantId: string, amount = 1, metric: string) => {
    await prisma.usage.create({
        data: { tenantId, amount, metric }
    })
}

