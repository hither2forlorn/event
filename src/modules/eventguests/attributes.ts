import { integer, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import guests from "@/modules/guests/schema";
import events from "@/modules/event/schema";

const tableName = "guestsEvent";
//This is the table of the transition between the guests and the events
const attributes = {
	id: serial("id"),
	attending: boolean("attending"),
	guestId: integer("guestId").references(() => guests.id),
	eventId: integer("eventId").references(() => events.id),
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()),
};

export { tableName, attributes };
