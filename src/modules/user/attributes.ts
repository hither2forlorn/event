import { serial, text, json, timestamp, pgEnum } from "drizzle-orm/pg-core";

const roleEnum = pgEnum("role", ["client", "vendor"]);

const tableName = "users";
const attributes = {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  foodPreference: text("foodPreference").notNull(),
  bio: text("bio"),
  photo: text("photo"),
  country: text("country"),
  city: text("city"),
  address: text("address"),
  zip: text("zip"),
  coverPhoto: text("coverPhoto"),
  info: json("info"),
  role: roleEnum("role").notNull().default("client"),
  // modules:,
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
};

export { tableName, attributes, roleEnum };
