import logger from "@/config/logger";
import Model from "./model";
import { throwErrorOnValidation } from "@/utils/error";
import Resource, { EventGuests } from "./resource";

//TODO: While making the geust event either pass the event and the guest id and the user information like the user id 
//UserId , GuestId , 
const create = async (input: Partial<EventGuests>) => {
	try {
		const { email, eventId, guestId } = input;
		if (!eventId || !guestId) {
			throwErrorOnValidation("Email and Event ID are required");
		}
		const existingEventGuest = await Model.find({ eventId });
		if (existingEventGuest) {
			throwErrorOnValidation("Guest with this email is already registered for this event");
		}
		const eventGuestRecord = await Model.create({
			eventId,
			guestId: guestId,
			attending: input.attending ?? true
		});

		if (!eventGuestRecord) {
			throw new Error("Failed to create event guest relation");
		}
		const result = await Model.find({ id: eventGuestRecord.id });
		logger.info(`Event guest created successfully for email: ${email}`);
		return Resource.toJson(result as any);
	} catch (err: any) {
		throw err;
	}
};

const list = async (query: any) => {
	try {
		//TODO: Make this 
		const params = {
			page: parseInt(query.page) || 1,
			limit: parseInt(query.limit) || 10,
			...query
		};
		const data = await Model.findAllAndCount(params);
		return {
			...data,
			items: Resource.collection(data.items as any)
		};
	} catch (err: any) {
		throw err;
	}
};

const listByEventId = async (eventId: number, query: any) => {
	try {
		const params = {
			page: parseInt(query.page) || 1,
			limit: parseInt(query.limit) || 10,
			eventId,
			...query
		};
		const data = await Model.findAllAndCount(params);
		return {
			...data,
			items: Resource.collection(data.items as any)
		};
	} catch (err: any) {
		throw err;
	}
};

const findById = async (id: number) => {
	try {
		const data = await Model.find({ id });
		return Resource.toJson(data as any);
	} catch (err: any) {
		throw err;
	}
};

const update = async (input: Partial<EventGuests>, id: number) => {
	try {
		const data = await Model.update(input, id);
		return Resource.toJson(data as any);
	} catch (err: any) {
		throw err;
	}
};

export default {
	create,
	list,
	listByEventId,
	findById,
	update
};
