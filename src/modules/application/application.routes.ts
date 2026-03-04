import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { ApplicationAdminController } from "./application.admin.controller";
import { ApplicationController } from "./application.controller";

const router = Router();
const applicationController = new ApplicationController();
const applicationAdminController = new ApplicationAdminController();

// Public routes
router.post("/", applicationController.create);

// Admin routes
router.get(
  "/admin/applications",
  authMiddleware,
  applicationAdminController.findAll,
);
router.delete(
  "/admin/applications/:id",
  authMiddleware,
  applicationAdminController.delete,
);

export default router;
