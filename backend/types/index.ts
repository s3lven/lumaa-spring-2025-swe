// Grab req.user from Request
declare module "express" {
  interface Request {
    user?: User;
  }
}

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface JwtPayload {
  userId: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

// Need to find a better way to grab the Task type from database
export interface TaskPool {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
}