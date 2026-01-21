import { serial, text, json, timestamp } from "drizzle-orm/pg-core"
const tableName = "ventures";
const attributes = {
	id: serial("id").primaryKey(),
	username: text("username").notNull(),
	email: text("email").notNull().unique(),
	password: text("password"),
	deviceTokens: json("deviceTokens"),// for the push notification
	info: json("info"), // Dumping Site info:{metadata:{} , permissions:{}}
	// modules:,
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
};

export { tableName, attributes };
