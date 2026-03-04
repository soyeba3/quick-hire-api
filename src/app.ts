import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { config } from "./config";
import { errorMiddleware } from "./middlewares/error.middleware";
import { responseMiddleware } from "./middlewares/response.middleware";
import applicationRoutes from "./modules/application/application.routes";
import authRoutes from "./modules/auth/auth.routes";
import jobRoutes from "./modules/job/job.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Success response wrapper
app.use(responseMiddleware);

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);

// Error handling
app.use(errorMiddleware);

app.listen(config.port, () => {
  console.log(`Server is running on port http://localhost:${config.port}`);
});

export default app;
