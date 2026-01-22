import { serial, text, json, timestamp } from "drizzle-orm/pg-core"
const tableName = "vendors";
const attributes = {
	id: serial("id").primaryKey(),
	userId: text("userId"),
	city: text("city"),
	nation: text("nation"),
	culture: text("culture"),
	theme: text("theme"),
	infos: json("infos"), // Dumping Site info:{metadata:{} , permissions:{}}
	// modules:,
	createdAt: timestamp("createdAt").defaultNow(),
	space: text("space"),
	updatedAt: timestamp("updatedAt").defaultNow(),
};

export { tableName, attributes };
