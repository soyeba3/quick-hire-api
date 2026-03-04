import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "quickhire_secret_key",
    expiresIn: "7d",
  },
  admin: {
    email: "admin@quickhire.com",
    password: "admin123",
  },
};
