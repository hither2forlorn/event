import { serial, text, json, timestamp } from "drizzle-orm/pg-core";
const tableName = "admins";
const attributes = {
  id: serial(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  info: json("info"),
  // modules:,
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
};

export { tableName, attributes };
