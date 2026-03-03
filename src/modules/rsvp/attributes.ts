import { serial, text, integer } from "drizzle-orm/pg-core";
import event from "@/modules/event/schema"
import user from "@/modules/user/schema";
import family from "@/modules/family/schema"
const tableName = "invitation";
const attributes = {
  id: serial("id"),
  eventId: integer("event_id").notNull().references(() => event.id, { onDelete: "cascade" }),
  userId: integer("user_id").references(() => user.id, { onDelete: "cascade" }),
  familyId: integer("family_id").references(() => family.id, { onDelete: "cascade" }),
  invited_by: integer("invited_by").notNull().references(() => user.id, { onDelete: "no action" }), // TODO: busiiness logic to discuss
  category: text("category"), //  friend  , colleague , family  
  respondedAt: text("respondedAt"),
  updatedAt: text("updatedAt"),
  responded_by: integer("responded_by"),
  status: text("status"), // accepted, declined, pending
};

export { tableName, attributes }; 
