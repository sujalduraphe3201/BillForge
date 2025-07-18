import { Router } from "express";
import { signup, login, me } from "../controllers/authController";
import { authenticate } from "../middlewares/authmiddleware";
const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/me", authenticate, me);

export default authRouter;
