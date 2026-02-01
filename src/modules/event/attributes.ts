import { integer, pgEnum, serial, text, timestamp } from "drizzle-orm/pg-core";
import user from "@/modules/user/schema";
import event from "./schema";
const tableName = "event";
const userEventTableName = "user_event";

const eventType = pgEnum("event_type", ["wedding"]);

const sideEnum = pgEnum("side", ["bride", "groom"]);

const attributes = {
  id: serial("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  type: eventType("type").notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  startTime: text("startTime"),
  endTIme: text("endTime"),
  parentId: integer("parentid"),
  location: text("location"),
  organizer: integer("organizer").references(() => user.id, {
    onDelete: "cascade",
  }),
  budget: integer("budget"),
  theme: text("theme"),
  attire: text("attire"),
  side: sideEnum("side"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
};

const userEventAttributes = {
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  eventId: integer("event_id")
    .notNull()
    .references(() => event.id),
  role: text("role"),
};

export {
  tableName,
  attributes,
  eventType,
  userEventAttributes,
  userEventTableName,
};
