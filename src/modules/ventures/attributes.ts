import {serial , text , json, timestamp} from "drizzle-orm/pg-core"
const tableName = "ventures";
const attributes = {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	username: text("username").notNull(),
	email: text("email").notNull().unique(),
	avatar: text("avatar"),
	password: text("password"),
	deviceTokens: json("deviceTokens"),// for the push notification
	info: json("info"),
	// modules:,
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
};

export { tableName, attributes };
