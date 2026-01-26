import { integer, pgEnum, serial, text, timestamp } from "drizzle-orm/pg-core";
import user from "@/modules/user/schema";
const tableName = "event";

const eventType = pgEnum("event_type", ["wedding"]);

const attributes = {
  id: serial("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  type: eventType("type").notNull(),
  date: timestamp("date").notNull(),
  duration: text("duration"),
  parentid: integer("parentid"),
  location: text("location"),
  organizer: integer("organizer").references(() => user.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
};

export { tableName, attributes, eventType };
