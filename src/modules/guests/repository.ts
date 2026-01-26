import guests from "./schema";
const selectQuery = {
	id: guests.id,
	email: guests.email,
	name: guests.name,
	address: guests.address,
	relation: guests.relation,
	phone: guests.phone,
	createdAt: guests.createdAt,
	updatedAt: guests.updatedAt,
};
export default {
	selectQuery,
};
