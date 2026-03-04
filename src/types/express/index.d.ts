import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?:
        | JwtPayload
        | { email: string; role: string; id: number; iat: number; exp: number }
        | string;
    }
  }
}
