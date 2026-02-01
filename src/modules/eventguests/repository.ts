import user from "../user/schema";
import eventguest from "./schema";
import guest from "../guests/schema";
import event from "@/modules/event/schema";
import GuestRepository from "@/modules/guests/repository"

const selectQuery = {
	id: eventguest.id,
	guestId: eventguest.guestId,
	eventId: eventguest.eventId,
	updatedAt: eventguest.updatedAt,
};

const selectWithGuestuser = {
	...selectQuery,
	Guest: {
		id: guest.id,
		email: user.email,
		name: user.name,
		address: user.address,
		relation: guest.relation,
		foodPreference: user.foodPreference,
		location: {
			country: user.country,
			zip_code: user.zip,
			address: user.address
		},
		role: user.role,
		phone: user.phone,
		createdAt: guest.createdAt,
		updatedAt: guest.updatedAt,
	}
}
const selectWithEvent = {
	...selectQuery,
	Event: {
		id: event.id,
		title: event.title,
		location: event.location,
		startDate: event.startDate,
		endDate: event.endDate,
		createdAt: event.createdAt,
		updatedAt: event.updatedAt,
	}
}
export default {
	selectQuery,
	selectWithGuestuser,
	selectWithEvent
};
