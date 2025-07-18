import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import subscriptionRoutes from "./routes/subscription";
import planRoutes from "./routes/plans";
import billingrouter from "./routes/billing-history";
import UsageRoutes from "./routes/usage";
import adminRouter from "./routes/admin";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api", planRoutes);
app.use("/api/subscribe", UsageRoutes);
app.use("/api/billing", billingrouter);
app.use("/api/admin/", adminRouter);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app;
