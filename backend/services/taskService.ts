import pool from "../db";
import { AppError } from "../src/utils/AppError";
import { Task } from "../types";

export class TaskService {
  async getTasks(): Promise<Task[]> {
    return pool<Task>('tasks').select('*');
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await pool<Task>('tasks').where({ id }).first();
    if (!task) throw new AppError('Task not found', 404);
    return task;
  }

  async createTask(data: Partial<Task>): Promise<Task> {
    if (!data.title) throw new AppError('Title is required', 400);
    const [newTask] = await pool<Task>('tasks').insert(data).returning('*');
    return newTask;
  }

  async updateTask(id: number, data: Partial<Task>): Promise<Task> {
    const [updatedTask] = await pool<Task>('tasks').where({ id }).update(data).returning('*');
    if (!updatedTask) throw new AppError('Task not found', 404);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    const deleted = await pool('tasks').where({ id }).del();
    if (!deleted) throw new AppError('Task not found', 404);
  }
}

export const taskService = new TaskService();
