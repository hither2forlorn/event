import db from "@/config/db";
import admins from "./schema";
import type { VendorColumn } from "./resource";
import Repository from "./repository";
import { sql, not, eq, or } from "drizzle-orm";
class VendorModel {
	static async findAllAndCount(params: any) {
		const { page, limit } = params;
		const offset = (page - 1) * limit;
		const result = await db
			.select(Repository.selectQuery as any)
			.from(admins)
			.where(not(eq(admins.id, 1)))
			.limit(limit)
			.offset(offset);

		const [{ count }]: any = await db
			.select({ count: sql<number>`count(*)` })
			.from(admins)
			.where(not(eq(admins.id, 1)));
		return {
			items: result,
			page,
			totalItems: parseInt(count.toString(), 10),
			totalPages: Math.ceil(count / limit),
		};
	}

	static async create(params: Partial<VendorColumn>) {
		const result = await db
			.insert(admins)
			.values(params as any)
			.returning();
		return result[0];
	}

	static async find(params: Partial<VendorColumn>) {
		const { id } = params;
		const conditions = [];
		if (id !== undefined) {
			conditions.push(eq(admins.id, id));
		}
		const result = await db
			.select()
			.from(admins)
			.where(or(...conditions));
		return result[0] || null;
	}

	static async update(params: Partial<VendorColumn | { password: string }>, id: number) {
		const result: any = await db
			.update(admins)
			.set(params as any)
			.where(eq(admins.id, id))
			.returning();
		// await redisService.del(`admin-${id}`);
		return result[0] || null;
	}
	static async destroy(id: number) {
		const result = await db.delete(admins).where(eq(admins.id, id)).returning();
		return result;
	}
}

export default VendorModel;
