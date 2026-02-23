import { serial, text, integer } from "drizzle-orm/pg-core";
const tableName = "rsvp";
const attributes = {
  id: serial("id"),
  event_guest_id: integer("event_guest_id"),
  responded_by: integer("responded_by"),
  status: text("status"),
  notes: text("notes"),
  respondedAt: text("respondedAt"),
  updatedAt: text("updatedAt"),
};

export { tableName, attributes };
