import { integer, pgEnum, serial, text, timestamp } from "drizzle-orm/pg-core";
// table name
const tableName = "event";
//Schema
import user from "@/modules/user/schema";
import event from "./schema";
//status
const eventType = pgEnum("event_type", ["wedding"]); // might have multiple type of event so not including this for now 
const statusEnum = pgEnum("status", ["draft", "published", "cancelled", "invited"]);



const eventMemberTableName = "user_event";
const eventGuestTableName = "event_guest";
const eventVendorTableName = "event_vendor"

const eventAttribute = {
	id: serial("id").unique().primaryKey(),
	title: text("title"),
	description: text("description"),
	type: text("type").notNull(),
	startDate: timestamp("startDate").notNull(),
	endDate: timestamp("endDate").notNull(),
	startTime: text("startTime"),
	endTIme: text("endTime"),
	location: text("location"),
	organizer: integer("organizer").references(() => user.id, {
		onDelete: "cascade",
	}),
	parentId: integer("parentid"),
	budget: integer("budget"),
	rsvp_deadline: text("rsvp_deadline"),
	visiblity: text("visiblity"),
	status: statusEnum("status"),
	theme: text("theme"),
	attire: text("attire"),
	side: text("side"),
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
};

const event_member_attribute = {
	id: serial("id").unique().primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => user.id),
	eventId: integer("event_id")
		.notNull()
		.references(() => event.id),
	role: text("role"),
};

const event_guest_attribute = {
	id: serial("id").unique().primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => user.id),
	eventId: integer("event_id")
		.notNull()
		.references(() => event.id),
	role: text("role"),
	invited_by: text("invited_by"),
	joined_at: text("joined_at")
}

const event_vendor_attribute = {
	id: serial("id").unique().primaryKey(),
	event_id: integer().notNull().references(() => event.id),
	vendor_buisness_id: text().notNull(),
	acquired_by: integer("acquired_by"),
	status: text("status"), // Accepted , Enquiring 
	notes: text("notes"),
	created_at: timestamp().defaultNow()
}

export {
	tableName,
	eventAttribute,
	eventType,
	event_vendor_attribute,
	event_member_attribute,
	event_guest_attribute,
	eventMemberTableName,
	eventGuestTableName,
	statusEnum,
	eventVendorTableName,
};
