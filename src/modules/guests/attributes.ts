import { integer, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
const tableName = "Guests";
// import events from "@/modules/events/schema" // Missing module
const attributes = {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	eventId: integer("eventId").notNull(), // .references(() => events.id), // Event has the guests - disabled due to missing schema
	email: text("email"),
	address: text("address"),
	relation: text("relation"),
	isDeleted: boolean("isDeleted").notNull().default(false),
	phone: text("phone"),
	// modules:,
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
};

export { tableName, attributes };
