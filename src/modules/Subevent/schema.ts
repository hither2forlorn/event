import { pgTable } from "drizzle-orm/pg-core";
import {
	eventAttribute,
	tableName,
	eventType,
	eventMemberTableName,
	eventGuestTableName,
	eventVendorTableName,
	event_vendor_attribute,
	event_member_attribute,
	event_guest_attribute,
} from "./attributes";
const schema = pgTable(tableName, eventAttribute);

const event_member_schema = pgTable(
	eventMemberTableName, event_member_attribute
);
const event_vendor_schema = pgTable(
	eventVendorTableName, event_vendor_attribute
)
const event_guest_schema = pgTable(
	eventGuestTableName, event_guest_attribute

)
export { eventType, event_member_schema, event_guest_schema, event_vendor_schema };
export default schema;
