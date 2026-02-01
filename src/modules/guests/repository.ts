import user from "@/modules/user/schema";
import guests from "./schema";
import event from "@/modules/event/schema"
const selectQuery = {
	id: guests.id,
	guest_email: user.email,
	guest_name: user.name,
	guest_address: user.address,
	guest_relation: guests.relation,
	guest_foodPreference: user.foodPreference,
	guest_location: {
		country: user.country,
		zip_code: user.zip,
		address: user.address
	},
	guest_role: user.role,
	guest_phone: user.phone,
	guest_createdAt: guests.createdAt,
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
