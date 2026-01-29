import db from "@/config/db/index";
import guestEvent from "./schema";
import guests from "@/modules/guests/schema"
import type { EventGuests } from "./resource"
import Repository from "./repository";
import { sql, eq, or } from "drizzle-orm";
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

	static async create(params: Partial<EventGuests>) {
		//TODO:Asuming there is the event and the guest make the eventgeust in this field 
	}

	static async find(params: Partial<EventGuests>) {
		//
		//TODO:Using the diferent parameter like the guest id ot the event id search the event and provide the info 
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
	//TODO: Optional can make the simpler low speed tassk while making the rsvp in the system work in the filwe 
	static rsvpUpdare() {

	}
	static async destroy(id: number) {
		//remove the guest from this service 
		const result = await db.delete(guests).where(eq(guestEvent.id, id)).returning();
		return result;
	}
}

export default GuestColumn;
