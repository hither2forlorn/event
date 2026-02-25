import user from "@/modules/user/schema";
import { integer, serial, text, timestamp } from "drizzle-orm/pg-core";

export const tableName = "guests";

export const attributes = {
  id: serial("id").primaryKey(),
  guestName: text("guest_name").notNull(),
  guestPhone: text("guest_phone").notNull(),
  guestEmail: text("guest_email").notNull(),
  guestAddress: text("guest_address").notNull(),
  guestStatus: text("guest_status").notNull(),

  createdBy: integer("created_by")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
};

export const guest_member_tableName = "guest_members";

export const guest_member_attributes = {
  id: serial("id").primaryKey(),

  guestId: integer("guest_id").notNull(), // ⚠️ no reference here

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