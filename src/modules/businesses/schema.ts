import {
	tableName,
	businessesAttribute,
	vendorVenueTableName,
	venueAttribute,
	vendorArtistTableName,
	PersonVendorAttribute,
} from "./attributes";
import { pgTable } from "drizzle-orm/pg-core";

const schema = pgTable(tableName, businessesAttribute);
const vendor_venue_schema = pgTable(vendorVenueTableName, venueAttribute);
const vendor_artist_schema = pgTable(vendorArtistTableName, PersonVendorAttribute);

export { vendor_venue_schema, vendor_artist_schema };
export default schema;
