import {
  tableName,
  businessesAttribute,
  vendorVenueTableName,
  venueAttribute,
  vendorServicesAttribute,
  vendorServiceTableName,
} from "./attributes";
import event from "@/modules/event/schema";
import { integer, pgTable, serial, varchar, timestamp, index } from "drizzle-orm/pg-core";

const schema = pgTable(tableName, businessesAttribute, (table) => [
  index('business_id').on(table.id)
]);
const vendor_venue_schema = pgTable(vendorVenueTableName, venueAttribute, (table) => [
  index("vendor_venues_business_id_idx").on(table.business_id),
]);
const vendor_services_schema = pgTable(vendorServiceTableName, vendorServicesAttribute, (table) => [
  index("vendor_services_business_id_idx").on(table.business_id),
]);

export const event_vendorTable = pgTable("event_vendor", {
  id: serial("id").primaryKey(),
  event_id: integer("event_id")
    .notNull()
    .references(() => event.id),
  vendor_buisness_id: integer("vendor_buisness_id").references(() => schema.id, { onDelete: "cascade" }),
  acquired_by: integer("acquired_by"),
  estimated_guest: integer("estimated_guest"),
  status: varchar("status", { length: 15 }),
  notes: varchar("notes", { length: 200 }),
  createdAt: timestamp("create_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdateFn(() => new Date())
});

export { vendor_venue_schema, vendor_services_schema };
export default schema;
