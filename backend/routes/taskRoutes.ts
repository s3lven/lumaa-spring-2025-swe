import express from "express";
import pool from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await pool.query(`SELECT * FROM tasks;`);

  res.json({ message: "Getting Tasks", payload: result.rows });
});

router.post("/", async (req, res) => {
  res.json({ message: "Posting Tasks" });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  res.json({ message: `Editing Task ${id}` });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.json({ message: `Deleting Task ${id}` });
});

export default router;
