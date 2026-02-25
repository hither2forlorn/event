import { pgTable } from "drizzle-orm/pg-core";
import { attributes, tableName } from "./attributes";
const family = pgTable(tableName, attributes);

export { family };
export default family;
