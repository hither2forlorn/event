import { serial, text, json, timestamp } from "drizzle-orm/pg-core"
const tableName = "admins";
const attributes = {
	id: serial("id").primaryKey(),
	email: text("email").notNull().unique(),
	password: text("password"),
	info: json("info"),
	// modules:,
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
};

export { tableName, attributes };
