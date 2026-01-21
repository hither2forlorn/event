import { serial, json, timestamp, text } from "drizzle-orm/pg-core"
const tableName = "category";
const attributes = {
	id: serial("id").primaryKey(),
	title: text("title"),
	question: json("question").$type<object>(), // define the type of the question in this module 
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
};

export { tableName, attributes };
