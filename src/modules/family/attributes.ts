import user from "@/modules/user/schema";
import { integer, serial, text, timestamp } from "drizzle-orm/pg-core";

const tableName = "families";
const attributes = {
  id: serial("id").primaryKey(),
  familyName: text("family_name").notNull(),
  createdBy: integer("created_by")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
};

export { tableName, attributes };
