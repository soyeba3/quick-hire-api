import jwt from "jsonwebtoken";
import { config } from "../../config";
import { ApiError } from "../../utils/api-error";

export class AuthService {
  async login(email: string, password: string) {
    if (email === config.admin.email && password === config.admin.password) {
      const token = jwt.sign(
        { email, role: "admin" },
        config.jwt.secret as string,
        {
          expiresIn: config.jwt.expiresIn as any,
        },
      );

      return {
        token,
        user: {
          email,
          role: "admin",
        },
      };
    }

    throw new ApiError(401, "Invalid email or password");
  }
}
