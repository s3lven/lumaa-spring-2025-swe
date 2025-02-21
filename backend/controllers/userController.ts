import { Request, Response, NextFunction } from "express";
import { userService } from "../services/userService";
import { AppError } from "../src/utils/AppError";

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        throw new AppError("Username and password are required", 400);
      const { user, token } = await userService.register(username, password);

      // Sending token to be used in local storage
      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        throw new AppError("Username and password are required", 400);
      const { user, token } = await userService.login(username, password);

      res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
