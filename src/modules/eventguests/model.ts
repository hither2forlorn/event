import db from "@/config/db/index";
import guestEvent from "./schema";
import guests from "@/modules/guests/schema"
import user from "@/modules/user/schema"
import type { EventGuests } from "./resource"
import Repository from "./repository";
import { sql, eq, or, and } from "drizzle-orm";
class GuestColumn {
	static async findAllAndCount(params: any) {
		const { page, limit, eventId, guestId } = params;
		const offset = (page - 1) * limit;
		const conditions = [];
		// Specific guest or the event in the system 
		if (!!guestId) {
			conditions.push(eq(guestEvent.guestId, guestId));
		}
		if (!!eventId) {
			conditions.push(eq(guestEvent.eventId, eventId))
		}
		let selectQuery = db.select(Repository.selectQuery).from(guestEvent)
			.leftJoin(guests, eq(guestEvent.guestId, guests.id))
			.leftJoin(user, eq(guests.userId, user.id))
		let countQuery = db.select({ count: sql<number>`count(*)` }).from(guestEvent);
		if (conditions.length > 0) {
			const filter = conditions.length === 1 ? conditions[0] : or(...conditions);
			selectQuery = selectQuery.where(filter) as any;
			countQuery = countQuery.where(filter) as any;
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

	static async create(params: Partial<EventGuests>) {
		//Asuming there is the event and the guest make the eventgeust in this field 
		const result = await db.insert(guestEvent).values(params as any).returning();
		return result[0];
	}

	static async find(params: Partial<EventGuests>) {
		const { id, eventId, guestId, email } = params;
		const conditions = [];
		if (id) conditions.push(eq(guestEvent.id, id));
		if (eventId) conditions.push(eq(guestEvent.eventId, eventId));
		if (guestId) conditions.push(eq(guestEvent.guestId, guestId));
		if (email) conditions.push(eq(user.email, email));

		if (conditions.length === 0) return null;

		const result = await db.select(Repository.selectWithGuestuser as any).from(guestEvent)
			.leftJoin(guests, eq(guestEvent.guestId, guests.id))
			.leftJoin(user, eq(guests.userId, user.id))
			.where(and(...conditions))
			.limit(1);

		return result[0] || null;
	}
	static async update(
		params: Partial<EventGuests>,
		id: number,
	) {
		const result: any = await db
			.update(guestEvent)
			.set(params as any).where(eq(guestEvent.id, id))
			.returning();
		return result[0] || null;
	}
	static async rsvpUpdate(id: number, attending: boolean) {
		const result = await db.update(guestEvent)
			.set({ attending })
			.where(eq(guestEvent.id, id))
			.returning();
		return result[0] || null;
	}
	static async destroy(id: number) {
		//remove the guest from this service 
		const result = await db.delete(guestEvent).where(eq(guestEvent.id, id)).returning();
		return result;
	}
}

export default GuestColumn;
