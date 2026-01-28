import { pgTable } from "drizzle-orm/pg-core";
import {
  attributes,
  tableName,
  eventType,
  userEventAttributes,
  userEventTableName,
} from "./attributes";

const schema = pgTable(tableName, attributes);

const eventUserSchema = pgTable(
  userEventTableName,
  userEventAttributes,
  (table) => ({
    pk: [table.userId, table.eventId],
  }),
);
export { eventType, eventUserSchema };
export default schema;
