import type { Response, Request, NextFunction } from "express";
import { User } from "../types";
import jwt, { JwtPayload } from "jsonwebtoken";
import pool from "../db";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Grab token from auth header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("There is no token in the request.");

    // Decode the JWT and check if user exists
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const result = await pool.query<User>("SELECT * FROM users WHERE id = $1", [
      decoded.userId,
    ]);

    // If they don't throw an error
    if (result.rows.length === 0) throw new Error("User does not exist.");

    // If all good, set the req.user object and proceed
    req.user = result.rows[0];
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "You are not authenticated. Please login and try again." });
  }
};
