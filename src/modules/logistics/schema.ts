import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { attributes, tableName } from "./attributes";
import invitation from "@/modules/invitation/schema"

export const vehicleSchema = pgTable(tableName, attributes);
const assignedVehicleTableName = "assigned_vehicle"
export const assignedVehicle = pgTable(assignedVehicleTableName, {
  id: serial("id").notNull().unique().primaryKey(),
  vehicleId: integer("vehicle_id",).references(() => vehicleSchema.id, { onDelete: "cascade" }).notNull(),
  invitationId: integer("invitation_id").references(() => invitation.id, { onDelete: "cascade" }).notNull(),
  fromTime: timestamp("fromTime"),
  toTime: timestamp("toTime"),
  fromLocation: varchar("from_location", { length: 100 }),
  toLocation: varchar("to_location", { length: 100 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()).notNull()
}
);
export default { vehicleSchema, assignedVehicle } 
