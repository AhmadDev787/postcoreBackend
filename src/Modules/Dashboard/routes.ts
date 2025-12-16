import { Router } from "express";
import { getUserDashboardData } from "./Controllers/controller";
import { AuthMiddleware } from "../../Middlewares/Auth.middleware";
import { addOnboardingData } from "./Controllers/addOnboardingData.controller";
const router = Router();
router.get("/", AuthMiddleware, getUserDashboardData);
router.post("/onboarding", AuthMiddleware, addOnboardingData);

export default router;
