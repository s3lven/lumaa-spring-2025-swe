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
