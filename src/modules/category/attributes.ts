import { serial, json, timestamp, text, integer } from "drizzle-orm/pg-core"
const tableName = "category";
type QuestionType = {
	question: string
}[]
const attributes = {
	id: serial("id").primaryKey(),
	parentId: integer("parentId"),
	title: text("title"),
	question: json("question").$type<QuestionType>(), // This will be dedkkk
	createdAt: timestamp("createdAt").defaultNow(),
	infos: json("infos"),
	updatedAt: timestamp("updatedAt").defaultNow(),
};

export { tableName, attributes };
