import { User } from "../models/authModel";

// Grab req.user from Request
declare module "express" {
  interface Request {
    user?: User;
  }
}

export interface JwtPayload {
  userId: number;
}

export interface TaskDTO {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

export interface UserDTO {
  user: Omit<User, "password">;
  token: string;
}
