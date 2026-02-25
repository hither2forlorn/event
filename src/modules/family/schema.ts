import { pgTable, primaryKey } from "drizzle-orm/pg-core";
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
  (table) => [
    primaryKey({
      columns: [table.familyId, table.userId],
      name: "family_member_pk",
    }),
  ],
);

export { family, family_member_schema };
export default family; 
