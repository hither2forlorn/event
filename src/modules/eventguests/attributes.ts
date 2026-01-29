import { integer, serial, timestamp } from "drizzle-orm/pg-core";
import guests from "@/modules/guests/schema";
import events from "@/modules/event/schema";


const tableName = "guestsEvent";
// import events from "@/modules/events/schema" // Missing module
const attributes = {
	id: serial("id"),
	guestId: integer("guestId").references(() => guests.id),
	eventId: integer("eventId").references(() => events.id),

	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()),
};

export { tableName, attributes };
