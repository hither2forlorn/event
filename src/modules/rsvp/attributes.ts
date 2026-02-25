import { serial, text, integer } from "drizzle-orm/pg-core";
const tableName = "invitation";
const attributes = {
  id: serial("id"),
  eventId: integer("event_id"),
  userId: integer("user_id"),
  familyId: integer("family_id"),
  invited_by: integer("invited_by"),
  category: text("category"), //  friend  , colleague , family  
  respondedAt: text("respondedAt"),
  updatedAt: text("updatedAt"),
  responded_by: integer("responded_by"),
  status: text("status"), // accepted, declined, pending
};

export { tableName, attributes };
