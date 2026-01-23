import { serial, text, json, timestamp, integer } from "drizzle-orm/pg-core"
import user from "@/modules/user/schema"
const tableName = "vendors";
type Question = {
	question: string,
	answer: string
}
type Description = {
	//Add more meta data in this to make the description more distingushable 
	question: Question[]
}
const attributes = {
	id: serial("id").primaryKey(),
	vendorName: text("vendor_name"),
	description: text("description"),
	owner: integer("owner").references(() => user.id, { "onDelete": "cascade" }),
	city: text("city"),
	nation: text("nation"),
	culture: text("culture"),
	theme: text("theme"),
	infos: json("infos").$type<Description>(), // Dumping Site info:{metadata:{} , permissions:{}}
	// modules:,
	createdAt: timestamp("createdAt").defaultNow(),
	space: text("space"),
	updatedAt: timestamp("updatedAt").defaultNow(),
};

export { tableName, attributes };
