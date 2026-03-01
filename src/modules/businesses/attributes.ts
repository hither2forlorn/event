import { text, serial, timestamp, integer } from "drizzle-orm/pg-core";
const tableName = "businesses";
const attributes = {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  business_name: text("business_name").notNull(),
  description: text("description"),
  avatar: text("avatar"),
  cover: text("cover"),
  location: text("location"),
  legal_document: text("legal_document"),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  category: text("category"),
  subcategory: text("subcategory"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
};
export { tableName, attributes };
