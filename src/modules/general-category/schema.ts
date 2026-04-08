import { pgTable } from "drizzle-orm/pg-core";
import { tableName, attributes } from "./attributes";

const schema = pgTable(tableName, attributes);

export default schema;
