import { pgTable } from "drizzle-orm/pg-core";
import user from "@/modules/user/schema";
import {
  attributes,
  tableName,
  guest_member_attributes,
  guest_member_tableName,
} from "./attribute";

export const guest = pgTable(tableName, attributes);

export const guest_member_schema = pgTable(
  guest_member_tableName,
  {
    ...guest_member_attributes,

    guestId: guest_member_attributes.guestId.references(() => guest.id, {
      onDelete: "cascade",
    }),
  }
);