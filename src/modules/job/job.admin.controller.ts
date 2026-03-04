import { NextFunction, Request, Response } from "express";
import { JobService } from "./job.service";

export class JobAdminController {
  private jobService = new JobService();

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as {
        search?: string;
        category?: string;
        location?: string;
        type?: string;
        limit?: string;
        offset?: string;
      };
      const jobs = await this.jobService.findAll(query);
      res.json(jobs);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const job = await this.jobService.create(req.body);
      res.status(201).json(job);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string);
      const job = await this.jobService.update(id, req.body);
      res.json(job);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string);
      await this.jobService.delete(id);
      res.json({ message: "Job deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
