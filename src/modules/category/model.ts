import db from "@/config/db";
import category from "./schema";
import type { CategoryColumn } from "./resource";
import Repository from "./repository";
import { sql, eq, or } from "drizzle-orm";

class Category {
	static async findAllAndCount(params: any) {
		const { page = 1, limit = 10 } = params;
		const offset = (page - 1) * limit;

		const result = await db
			.select(Repository.selectQuery)
			.from(category)
			.limit(limit)
			.offset(offset);

		const [{ count }]: any = await db
			.select({ count: sql<number>`count(*)` })
			.from(category);

		return {
			items: result,
			page,
			totalItems: parseInt(count.toString(), 10),
			totalPages: Math.ceil(count / limit),
		};
	}

	static async create(params: Partial<CategoryColumn>) {
		const result = await db
			.insert(category)
			.values(params as any)
			.returning();
		return result[0];
	}

	static async find(params: Partial<CategoryColumn>) {
		const { id, title } = params;
		const conditions = [];
		if (id !== undefined) {
			conditions.push(eq(category.id, id));
		}
		if (title !== undefined) {
			conditions.push(eq(category.title, title as string));
		}

		if (conditions.length === 0) return null;

		const result = await db
			.select()
			.from(category)
			.where(or(...conditions));
		return result[0] || null;
	}

	static async update(params: Partial<CategoryColumn>, id: number) {
		const result = await db
			.update(category)
			.set({ ...params, updatedAt: new Date() } as any)
			.where(eq(category.id, id))
			.returning();
		return result[0] || null;
	}

	static async destroy(id: number) {
		const result = await db
			.delete(category)
			.where(eq(category.id, id))
			.returning();
		return result;
	}
}

export default Category;
