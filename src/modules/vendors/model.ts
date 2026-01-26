import db from "@/config/db";
import vendors from "./schema";
import type { VendorColumn } from "./resource";
import Repository from "./repository";
import user from "@/modules/user/schema";
import { sql, eq, or } from "drizzle-orm";
class VendorModel {
	static async findAllAndCount(params: any) {
		const { page, limit } = params;
		const offset = (page - 1) * limit;
		const result = await db
			.select(Repository.selectQuery as any)
			.from(vendors)
			.leftJoin(user, eq(user.id, vendors.owner))
			.limit(limit)
			.offset(offset);
		const [{ count }]: any = await db
			.select({ count: sql<number>`count(*)` })
			.from(vendors)
		return {
			items: result,
			page,
			totalItems: parseInt(count.toString(), 10),
			totalPages: Math.ceil(count / limit),
		};
	}

	static async create(params: Partial<VendorColumn>) {
		const result = await db
			.insert(vendors)
			.values(params as any)
			.returning();
		return result[0];
	}

	static async find(params: Partial<VendorColumn>) {
		const { id } = params;
		const conditions = [];
		if (id !== undefined) {
			conditions.push(eq(vendors.id, id));
		}
		const result = await db
			.select()
			.from(vendors)
			.where(or(...conditions));
		return result[0] || null;
	}

	static async update(params: Partial<VendorColumn | { password: string }>, id: number) {
		const result: any = await db
			.update(vendors)
			.set(params as any)
			.where(eq(vendors.id, id))
			.returning();
		return result[0] || null;
	}
	static async destroy(id: number) {
		const result = await db.delete(vendors).where(eq(vendors.id, id)).returning();
		return result;
	}
}
export default VendorModel;
