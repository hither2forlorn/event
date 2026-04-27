import { serial, timestamp, varchar, numeric, integer } from "drizzle-orm/pg-core";
import event from "@/modules/event/schema";
import business from "@/modules/businesses/schema";

const tableName = "catering";

const attributes = {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  per_plate_price: numeric("per_plate_price", { precision: 10, scale: 2, mode: "number" }).notNull(),
  startDateTime: timestamp("start_date_time", { withTimezone: true }).notNull(),
  endDateTime: timestamp("end_date_time", { withTimezone: true }).notNull(),
  eventId: integer("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),
  meal_type: varchar("meal_type", { length: 255 }).notNull(),
  vendorId: integer("vendor_id").references(() => business.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
};

export { tableName, attributes };
