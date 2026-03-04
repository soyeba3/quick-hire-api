import { NextFunction, Request, Response } from "express";
import { ApplicationService } from "./application.service";

export class ApplicationController {
  private applicationService = new ApplicationService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const application = await this.applicationService.create(req.body);
      res.status(201).json(application);
    } catch (error) {
      next(error);
    }
  };
}
