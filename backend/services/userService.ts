import argon2 from "argon2";
import { User } from "../types";
import jwt from "jsonwebtoken";
import pool from "../db";
import { AppError } from "../src/utils/AppError";

export class UserService {
  async register(
    username: string,
    password: string
  ): Promise<{ user: Omit<User, "password">; token: string }> {
    try {
      const hashedPassword = await argon2.hash(password);

      const result: Omit<User, "password"> = await pool
        .insert<User>({
          username,
          password: hashedPassword,
        })
        .into("users")
        .returning(["id", "username"]);

      console.log("RESULT:", result);

      const token = jwt.sign({ userId: result.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      return { user: result, token };
    } catch (error: any) {
      if (error.code === "23505") {
        throw new AppError("Username already exists", 409);
      } else {
        throw new AppError("Internal server error", 500);
      }
    }
  }

  async login(
    username: string,
    password: string
  ): Promise<{ user: Omit<User, "password">; token: string }> {
    const result = await pool
      .select("*")
      .from<User>("users")
      .where({ username });

    if (result.length === 0) throw new AppError("Invalid credentials", 401);

    const user = result[0];
    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) throw new AppError("Invalid credentials", 401);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "5m",
    });

    return { user: { id: user.id, username: user.username }, token };
  }
}

export const userService = new UserService();
