import express from "express";
import { taskController } from "../controllers/taskController.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, (req, res, next) =>
  taskController.getTasks(req, res, next)
);
router.post("/", checkAuth, (req, res, next) =>
  taskController.createTask(req, res, next)
);
router.put("/:id", checkAuth, (req, res, next) =>
  taskController.updateTask(req, res, next)
);
router.delete("/:id", checkAuth, (req, res, next) =>
  taskController.deleteTask(req, res, next)
);

export default router;
