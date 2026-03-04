import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { JobAdminController } from "./job.admin.controller";
import { JobController } from "./job.controller";

const router = Router();
const jobController = new JobController();
const jobAdminController = new JobAdminController();

// Admin routes
router.get("/admin/jobs", authMiddleware, jobAdminController.findAll);
router.post("/admin/jobs", authMiddleware, jobAdminController.create);
router.put("/admin/jobs/:id", authMiddleware, jobAdminController.update);
router.delete("/admin/jobs/:id", authMiddleware, jobAdminController.delete);

// Public routes
router.get("/", jobController.findAll);
router.get("/:id", jobController.findOne);

export default router;
