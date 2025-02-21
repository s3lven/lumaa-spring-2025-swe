import express from "express";
import type { Request, Response, NextFunction } from "express";
import { userController } from "../controllers/userController";

const router = express.Router();

router.post("/register", (req: Request, res: Response, next: NextFunction) =>
  userController.register(req, res, next)
);

router.post("/login", (req: Request, res: Response, next: NextFunction) =>
  userController.login(req, res, next)
);

export default router;
