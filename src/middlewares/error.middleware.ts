import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  console.error("Error :>> ", err);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    data: {
      statusCode,
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      ...(err.errors && { errors: err.errors }),
    },
  });
};
