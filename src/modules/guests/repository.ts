import user from "@/modules/user/schema";
import guests from "./schema";
import event from "@/modules/event/schema"
const selectQuery = {
	id: guests.id,
	email: user.email,
	name: user.name,
	address: user.address,
	relation: guests.relation,
	foodPreference: user.foodPreference,
	location: {
		country: user.country,
		zip_code: user.zip,
		address: user.address
	},
	role: user.role,
	phone: user.phone,
	createdAt: guests.createdAt,
	updatedAt: guests.updatedAt,
};
const selectWithEvent = {
	...selectQuery,
	event_detail: {
		eventTitle: event.title,
		event_venue: event.location,
		event_start: event.startDate,
		event_end: event.endDate
	}
}
export default {
	selectQuery,
	selectWithEvent
};
