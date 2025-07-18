import { prisma } from "../../prisma/client";

export const activityLog = async ({
    userId,
    tenantId,
    action,
    metadata = {},
}: {
    userId: string;
    tenantId: string;
    action: string;
    metadata?: any;
}) => {
    try {
        await prisma.activityLog.create({
            data: {
                userId,
                tenantId,
                action,
                metadata,
            },
        });
    } catch (err) {
        console.error("Activity logging failed:", err);
    }
};
