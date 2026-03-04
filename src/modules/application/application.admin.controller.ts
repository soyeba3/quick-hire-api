import { NextFunction, Request, Response } from "express";
import { ApplicationService } from "./application.service";

export class ApplicationAdminController {
  private applicationService = new ApplicationService();

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const applications = await this.applicationService.findAll();
      res.json(applications);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string);
      await this.applicationService.delete(id);
      res.json({ message: "Application deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
