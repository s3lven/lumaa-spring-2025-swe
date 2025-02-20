import express from "express";
import pool from "../db/index.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { Task, TaskPool } from "../types/index.js";

const router = express.Router();

router.get("/", checkAuth, async (req, res) => {
  try {
    const result = await pool.select("*").from<Task>("tasks");

    console.log(result);

    res.json({ message: "Getting Tasks", payload: result });
  } catch (error) {
    let message =
      error instanceof Error ? error.message : `Error adding tasks to database`;
    console.error(error);
    res.status(500).json({ message });
  }
});

router.post("/", checkAuth, async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    const result = await pool<TaskPool>("tasks")
      .insert({ title, description, is_complete: isComplete })
      .returning(["id", "title", "description", "is_complete as isComplete"]);

    res.status(201).json({ message: "Posting Tasks", payload: result });
  } catch (error) {
    let message =
      error instanceof Error ? error.message : `Error adding tasks to database`;
    console.error(error);
    res.status(500).json({ message });
  }
});

router.put("/:id", checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    const idCheck = await pool<TaskPool>("tasks").select("id").where("id", id);

    if (idCheck.length === 0) {
      res.status(404).json({ message: `Task ${id} was not found` });
      return;
    }

    const result = await pool<TaskPool>("tasks")
      .where("id", id)
      .update({ title, description, is_complete: isComplete })
      .returning(["id", "title", "description", "is_complete as isComplete"]);

    res.json({ message: `Editing Task ${id}`, payload: result });
  } catch (error) {
    let message =
      error instanceof Error ? error.message : `Error editing task on database`;
    console.error(error);
    res.status(500).json({ message });
  }
});

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const idCheck = await pool<TaskPool>("tasks").select("id").where("id", id);

    if (idCheck.length === 0) {
      res.status(404).json({ message: `Task ${id} was not found` });
      return;
    }

    await pool<TaskPool>("tasks").where("id", id).del().returning("*");

    res.json({ message: `Deleting Task ${id}` });
  } catch (error) {
    let message =
      error instanceof Error
        ? error.message
        : `Error deleting task on database`;
    console.error(error);
    res.status(500).json({ message });
  }
});

export default router;
