export interface EventGuests {
	id: number;
	eventId: number;
	guestId: number;
	name: string;
	email: string;
	address: string;
	relation: string;
	phone: string,
	// modules:,
	attending: boolean,
	createdAt: any,
	updatedAt: any,
}
class Resource {
	static toJson(guests: EventGuests): Partial<EventGuests> | null {
		if (!guests) return null;
		const data: Partial<EventGuests> = {
			id: guests.id,
			eventId: guests.eventId,
			guestId: guests.guestId,
			email: guests.email,
			name: guests.name,
			address: guests.address,
			relation: guests.relation,
			phone: guests.phone,
			attending: guests.attending,
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
