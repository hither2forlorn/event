export interface GuestColumn {
	id: number;
	userId: number;
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
	static toJson(guests: GuestColumn): Partial<GuestColumn> | null {
		if (!guests) return null;
		const data: Partial<GuestColumn> = {
			id: guests.id,
			userId: guests.userId,
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
	static collection(guests: GuestColumn[]) {
		return guests.map(this.toJson);
	}
}

export default Resource;
