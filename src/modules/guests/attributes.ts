import user from "@/modules/user/schema"
import { integer, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
const tableName = "guests";
// import events from "@/modules/events/schema" // Missing module
const attributes = {
	id: serial("id").primaryKey(),
	userId: integer("userId").references(() => user.id),
	eventId: integer("eventId").notNull(), // .references(() => events.id), // Event has the guests - disabled due to missing schema
	relation: text("relation"),
	isDeleted: boolean("isDeleted").notNull().default(false),
	phone: text("phone"),
	// modules:,
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
};

export { tableName, attributes };
