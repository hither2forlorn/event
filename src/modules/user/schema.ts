import { pgTable } from "drizzle-orm/pg-core";
import { attributes, tableName, roleEnum } from "./attributes";
const schema = pgTable(tableName, attributes);
export { roleEnum };
export default schema;
