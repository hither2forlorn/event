import db from "@/config/db/index";
import guests from "./schema";
import user from "@/modules/user/schema"
import type { GuestColumn } from "./resource"
import Repository from "./repository";
import { sql, eq, or, and } from "drizzle-orm";
class Guests {
	static async findAllAndCount(params: any) {
		const { page, limit, guestsId } = params;
		const offset = (page - 1) * limit;

		const conditions = [];
		if (!!guestsId) {
			conditions.push(eq(guests.eventId, guestsId));
		}
		let selectQuery = db.select(Repository.selectQuery).from(guests);
		let countQuery = db.select({ count: sql<number>`count(*)` }).from(guests);
		if (conditions.length > 0) {
			selectQuery = selectQuery.where(conditions.length === 1 ? conditions[0] : or(...conditions)) as any;
			countQuery = countQuery.where(conditions.length === 1 ? conditions[0] : or(...conditions)) as any;
		}
		const result = await selectQuery.limit(limit).offset(offset);
		const [{ count }]: any = await countQuery;
		return {
			items: result,
			page,
			totalItems: parseInt(count.toString(), 10),
			totalPages: Math.ceil(count / limit),
		};
	}

	static async create(params: Partial<GuestColumn>) {
		const result = await db
			.insert(guests)
			.values(params as any)
			.returning();
		return result[0];
	}

	static async find(params: Partial<GuestColumn> & { email?: string }) {
		const { id, email, relation } = params;
		const conditions = [];
		if (id !== undefined) {
			conditions.push(eq(guests.id, id));
		}
		if (email !== undefined) {
			conditions.push(eq(user.email, email));
		}
		if (relation !== undefined) {
			conditions.push(eq(guests.relation, relation));
		}
		if (conditions.length === 0) {
			return null;
		}

		const result = await db
			.select()
			.from(guests)
			.leftJoin(user, eq(guests.userId, user.id))
			.where(conditions.length === 1 ? conditions[0] : and(...conditions));

		if (!result[0]) return null;

		// Return flattened object if needed, but for now just fix the query
		return { ...result[0].guests, user: result[0].users } as any;
	}
	static async update(
		params: Partial<GuestColumn>,
		id: number,
	) {
		const result: any = await db
			.update(guests)
			.set(params as any).where(eq(guests.id, id))
			.returning();
		// await redisService.dl(`admin-${id}`);
		return result[0] || null;
	}
	static async destroy(id: number) {
		const result = await db.delete(guests).where(eq(guests.id, id)).returning();
		// await redisService.del(`guest-${id}`);
		return result;
	}
}

export default Guests;
