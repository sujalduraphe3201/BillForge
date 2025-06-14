import express, { Request, Response, NextFunction } from "express";
import subscriptionRoutes from "./routes/subscription"
import cors from "cors";
import authRoutes from "./routes/auth";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth/", authRoutes);
app.use("api/subscribe/", subscriptionRoutes);
const PORT = process.env.PORT || 5000;
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app;
