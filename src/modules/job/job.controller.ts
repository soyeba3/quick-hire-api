import { NextFunction, Request, Response } from "express";
import { JobService } from "./job.service";

export class JobController {
  private jobService = new JobService();

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search, category, location, type, limit, offset } = req.query as {
        search?: string;
        category?: string;
        location?: string;
        type?: string;
        limit?: string;
        offset?: string;
      };
      const jobs = await this.jobService.findAll({
        search,
        category,
        location,
        type,
        limit,
        offset,
      });
      res.json(jobs);
    } catch (error) {
      next(error);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string);
      const job = await this.jobService.findOne(id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      next(error);
    }
  };
}
