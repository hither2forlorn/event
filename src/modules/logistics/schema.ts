import { integer, pgTable, primaryKey, timestamp, varchar } from "drizzle-orm/pg-core";
import { attribute, table_name } from "./attributes";
import invitation from "@/modules/invitation/schema"

export const vehicle_schema = pgTable(table_name, attribute);
const assigned_vehicle_tableName = "assigned_vehicle"
export const assigned_vehicle = pgTable(assigned_vehicle_tableName, {
  vehicleId: integer("vehicle_id",).references(() => vehicle_schema.id, { onDelete: "cascade" }).notNull(),
  invitationId: integer("invitation_id").references(() => invitation.id, { onDelete: "cascade" }).notNull(),
  pickupTime: timestamp("pickup_time"),
  dropoffTime: timestamp("dropoff_time"),
  pickupLocation: varchar("pickup_location", { length: 200 }),
  dropoffLocation: varchar("dropoff_location", { length: 200 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()).notNull()
},
  (table) => [
    primaryKey({
      columns: [table.vehicleId, table.invitationId]
    })]
);
export default { vehicle_schema, assigned_vehicle } 
