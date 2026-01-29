export interface EventGuests {
	id: number;
	eventId: number;
	name: string;
	email: string;
	address: string;
	relation: string;
	phone: string,
	// modules:,
	createdAt: any,
	updatedAt: any,
}
class Resource {
	static toJson(guests: EventGuests): Partial<EventGuests> | null {
		if (!guests) return null;
		const data: Partial<EventGuests> = {
			id: guests.id,
			eventId: guests.eventId,
			email: guests.email,
			name: guests.name,
			address: guests.address,
			relation: guests.relation,
			phone: guests.phone,
			updatedAt: guests.updatedAt,
			createdAt: guests.createdAt,
		};
		return data;
	}
	static collection(guests: EventGuests[]) {
		return guests.map(this.toJson);
	}
}

export default Resource;
