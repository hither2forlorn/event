import { text, serial } from "drizzle-orm/pg-core";
const tableName = "businesses"
const attributes = {
	id: serial("id").primaryKey(),
	business_name: text("business_name").notNull(),  // fixed ✅
	avatar: text("avatar"),
	cover: text("cover"),
	location: text("location"),
	legal_document: text("legal_document")

}
export { tableName, attributes }; 
