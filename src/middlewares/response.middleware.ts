import { NextFunction, Request, Response } from "express";

export const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalJson = res.json;

  res.json = function (data: any) {
    // If it's already formatted or an error response (status: 'error'), don't wrap it again
    if (data && (data.status === "success" || data.status === "error")) {
      return originalJson.call(this, data);
    }

    const formattedResponse = {
      status: "success",
      path: req.originalUrl,
      statusCode: res.statusCode,
      timestamp: new Date().toISOString(),
      data: data,
    };

    return originalJson.call(this, formattedResponse);
  };

  next();
};
