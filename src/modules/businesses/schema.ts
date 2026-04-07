import {
  tableName,
  businessesAttribute,
  vendorVenueTableName,
  venueAttribute,
  vendorServicesAttribute,
  vendorServiceTableName,
} from "./attributes";
import { integer, pgTable } from "drizzle-orm/pg-core";

const schema = pgTable(tableName, businessesAttribute);
const vendor_venue_schema = pgTable(vendorVenueTableName, venueAttribute);
const vendor_services_schema = pgTable(vendorServiceTableName, vendorServicesAttribute);

const event_businesses = pgTable("event_business", {
  eventid: integer("eventid"),
  business_id: integer("business_id"),

}

)

export { vendor_venue_schema, vendor_services_schema, event_businesses };
export default schema;
