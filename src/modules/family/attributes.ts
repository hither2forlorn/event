import user from "@/modules/user/schema";
import { family } from "./schema";
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

const family_member_tableName = "family_members";
const family_member_attributes = {
  id: serial("id").primaryKey(),
  familyId: integer("family_id")
    .notNull()
    .references(() => family.id),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  relation: text("relation").notNull(),
  addedBy: integer("added_by")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
};

export {
  tableName,
  attributes,
  family_member_attributes,
  family_member_tableName,
};
