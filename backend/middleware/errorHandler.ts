import { Request, Response, NextFunction } from "express";
import { AppError } from "../src/utils/AppError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return
  }

  console.error(err);

  res.status(500).json({ error: "Internal Server Error" });
}
