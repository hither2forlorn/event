import { pgTable } from "drizzle-orm/pg-core";
import { integer, serial, text, timestamp } from "drizzle-orm/pg-core";
import user from "@/modules/user/schema"
import {
  eventAttribute,
  tableName,
  eventType,
  eventMemberTableName,
  eventGuestTableName,
  eventVendorTableName,
} from "./attributes";

const schema = pgTable(tableName, eventAttribute);

const event_member_attribute = {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => schema.id, { onDelete: "cascade" }),
  eventId: integer("event_id")
    .references(() => schema.id, { onDelete: "cascade" }),
  role: text("role"),
};

const event_guest_attribute = {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  notes: text("notes"),
  eventId: integer("event_id")
    .notNull()
    .references(() => schema.id),
  familyId: integer("family_id"),
  role: text("role"),
  invited_by: integer("invited_by")
    .references(() => schema.id)
    .notNull(),
  joined_at: text("joined_at"),
};

const event_vendor_attribute = {
  id: serial("id").primaryKey(),
  event_id: integer("event_id")
    .notNull()
    .references(() => schema.id),
  vendor_buisness_id: text("vendor_buisness_id").notNull(),
  acquired_by: integer("acquired_by"),
  status: text("status"), // Accepted , Enquiring
  notes: text("notes"),
  created_at: timestamp().defaultNow(),
};

const event_member_schema = pgTable(
  eventMemberTableName, event_member_attribute
);
const event_vendor_schema = pgTable(
  eventVendorTableName, event_vendor_attribute
)
const event_guest_schema = pgTable(
  eventGuestTableName, event_guest_attribute

)
export { eventType, event_member_schema, event_guest_schema, event_vendor_schema };
export default schema;
