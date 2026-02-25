import { pgTable } from "drizzle-orm/pg-core";
import {
  attributes,
  tableName,
  family_member_attributes,
  family_member_tableName,
} from "./attributes";
const family = pgTable(tableName, attributes);

const family_member_schema = pgTable(
  family_member_tableName,
  family_member_attributes,
);

export { family, family_member_schema };
export default family; 
