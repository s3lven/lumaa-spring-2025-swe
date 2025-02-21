import pool from "../db";
import { Task } from "../models/taskModel";
import { AppError } from "../src/utils/AppError";
import { TaskDTO } from "../types";

export class TaskService {
  async getTasks(): Promise<TaskDTO[]> {
    try {
      const result = await pool<Task>("tasks")
        .select("*")
        .orderBy("id", "desc");
      const tasks: TaskDTO[] = result.map((task) => ({
        isComplete: task.is_complete,
        ...task,
      }));
      return tasks;
    } catch (error: any) {
      throw new AppError("Internal server error", 500);
    }
  }

  async getTaskById(id: number): Promise<TaskDTO> {
    try {
      const result = await pool<Task>("tasks").where({ id }).first();
      if (!result) throw new AppError("Task not found", 404);
      const task: TaskDTO = {
        isComplete: result.is_complete,
        ...result,
      };
      return task;
    } catch (error: any) {
      if (error.code === "42703") {
        throw new AppError("Task not found", 404);
      } else {
        throw new AppError("Internal server error", 500);
      }
    }
  }

  async createTask(data: Partial<Task>): Promise<TaskDTO> {
    if (!data.title) throw new AppError("Title is required", 400);
    const [result] = await pool<Task>("tasks").insert(data).returning("*");
    const newTask: TaskDTO = {
      isComplete: result.is_complete,
      ...result,
    };
    return newTask;
  }

  async updateTask(id: number, data: Partial<Task>): Promise<TaskDTO> {
    try {
      const [result] = await pool<Task>("tasks")
        .where("id", id)
        .update(data)
        .returning("*");
      if (!result) throw new AppError("Task not found", 404);
      const updatedTask: TaskDTO = {
        isComplete: result.is_complete,
        ...result,
      };
      return updatedTask;
    } catch (error: any) {
      if (error.code === "42703") {
        throw new AppError("Task not found", 404);
      } else {
        throw new AppError("Internal server error", 500);
      }
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      const deleted = await pool("tasks").where({ id }).del();
      if (!deleted) throw new AppError("Task not found", 404);
    } catch (error: any) {
      if (error.code === "42703") {
        throw new AppError("Task not found", 404);
      } else {
        throw new AppError("Internal server error", 500);
      }
    }
  }
}

export const taskService = new TaskService();
