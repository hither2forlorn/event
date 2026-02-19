import { tableName, attributes } from "./attributes";
import { pgTable } from "drizzle-orm/pg-core";
const schema = pgTable(tableName, attributes);
export default schema;
