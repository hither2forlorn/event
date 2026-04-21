import { integer, serial, timestamp, varchar } from "drizzle-orm/pg-core"
import event from "@/modules/event/schema"
export const table_name = 'event_vehicle'
export const attribute = {
  id: serial("id").notNull().unique(),
  vehicleName: varchar("vehicle_name", { length: 100 }).notNull(),
  eventId: integer("event_id").references(() => event.id, { onDelete: "cascade" }).notNull(),
  wheelCount: integer("wheel_count"),
  driverName: varchar("driver_name", { length: 100 }),
  driverNumber: varchar("driver_number", { length: 15 }),
  capacity: integer().notNull(),
  availablityStartTime: timestamp("available_start_time", { withTimezone: true }),
  availablityEndTime: timestamp("available_end_time", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdateFn(() => new Date()).notNull()
}
