import { pgTable } from "drizzle-orm/pg-core";
import { attributes, tableName } from "./attributes.ts";
const schema = pgTable(tableName, attributes);
export default schema;
