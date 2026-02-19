import { text, serial } from "drizzle-orm/pg-core";
const tableName = "businesses"
const attributes = {
	id: serial().unique().primaryKey(),
	buisness_name: text("buisness_name").notNull(),
	avatar: text("avatar"),
	cover: text("cover"),
	location: text("location"),
	legal_docuemnt: text("legal_document")
}
export { tableName, attributes }; 
