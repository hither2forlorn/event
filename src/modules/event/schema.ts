import { pgTable } from "drizzle-orm/pg-core";
import { attributes, tableName, eventType } from "./attributes";

const schema = pgTable(tableName, attributes);
export { eventType };
export default schema;
