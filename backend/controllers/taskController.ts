import { Request, Response, NextFunction } from "express";
import { taskService } from "../services/taskService";
import { AppError } from "../src/utils/AppError";
import { Task, TaskPool } from "../types";

export class TaskController {
  async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await taskService.getTasks();
      res.json({ message: "Getting Tasks", payload: tasks });
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw new AppError("Invalid task ID", 400);
      }
      const task = await taskService.getTaskById(id);
      res.json({ message: "Getting Task", payload: task });
    } catch (error) {
      next(error);
    }
  }

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;
      if (!title) {
        throw new AppError("Title is required", 400);
      }
      const newTask = await taskService.createTask({ title, description });
      res.status(201).json({ message: "Posting Tasks", payload: newTask });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new AppError("Invalid task ID", 400);
      }
      const { title, description, isComplete } = req.body;
      if (!title) {
        throw new AppError("Missing required fields", 400);
      }

      // Could use more sanitization and validation here
      const task: Partial<TaskPool> = {
        title,
        description: description || "",
        is_complete: isComplete,
      };

      const updatedTask = await taskService.updateTask(id, task);
      res.json({ message: `Updating Task ${id}`, payload: updatedTask });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await taskService.deleteTask(id);
      res.status(204).json({ message: `Deleting Task ${id}` });
    } catch (error) {
      next(error);
    }
  }
}

export const taskController = new TaskController();
