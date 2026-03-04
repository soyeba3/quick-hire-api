import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { config } from "../config";
import * as schema from "./schema";

const poolConnection = mysql.createPool(config.database.url);

export const db = drizzle(poolConnection, { schema, mode: "default" });
