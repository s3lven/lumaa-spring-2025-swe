import express from "express";
import type { Request, Response } from "express";
import pool from "../db";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { User } from "../types";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await argon2.hash(password);

    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hashedPassword]
    );

    const token = jwt.sign(
      { userId: result.rows[0].id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Sending token to be used in local storage
    res.status(201).json({ user: result.rows[0], token });
  } catch (error: any) {
    console.error(error);
    // Catches Postgres error
    if (error.code === "23505") {
      res.status(409).json({ error: "Username already exists" });
      return;
    }
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;
    const result = await pool.query<User>(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const user = result.rows[0];
    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1m",
    });

    res.json({
      user: { id: user.id, username: user.username },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
