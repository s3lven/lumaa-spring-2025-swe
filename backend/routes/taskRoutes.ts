import express from "express";
import pool from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM tasks;`);

    res.json({ message: "Getting Tasks", payload: result.rows });
  } catch (error) {
    let message =
      error instanceof Error ? error.message : `Error adding tasks to database`;
    console.error(error);
    res.status(500).json({ message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    const result = await pool.query(
      `
      INSERT INTO tasks (title, description, is_complete)
      VALUES ($1, $2, $3)
      RETURNING id, title, description, is_complete as "isComplete";
    `,
      [title, description, isComplete]
    );

    res.status(201).json({ message: "Posting Tasks", payload: result.rows });
  } catch (error) {
    let message =
      error instanceof Error ? error.message : `Error adding tasks to database`;
    console.error(error);
    res.status(500).json({ message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body();

    const result = await pool.query(
      `
    UPDATE tasks
    SET title = $1, description = $2, is_complete = $3
    WHERE id = $4
    RETURNING id, title, description, is_complete as "isComplete"
    `,
      [title, description, isComplete]
    );

    res.json({ message: `Editing Task ${id}`, payload: result.rows });
  } catch (error) {
    let message =
      error instanceof Error ? error.message : `Error editing task on database`;
    console.error(error);
    res.status(500).json({ message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
    DELETE FROM tasks
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: `Task ${id} not found` });
    }

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
