import logger from "@/config/logger";
import Model from "./model";
import { throwErrorOnValidation } from "@/utils/error";
import Resource, { EventGuests } from "./resource";
import UserModel from "@/modules/user/model";
import GuestModel from "@/modules/guests/model";

const create = async (input: Partial<EventGuests>) => {
	try {
		const { email, eventId, name, phone, relation } = input;

		if (!email || !eventId) {
			throwErrorOnValidation("Email and Event ID are required");
		}

		// 1. Check if EventGuest entry already exists for this event and email
		const existingEventGuest = await Model.find({ email, eventId });
		if (existingEventGuest) {
			throwErrorOnValidation("Guest with this email is already registered for this event");
		}

		// 2. Find or Create User
		let user: any = await UserModel.find({ email });
		if (!user) {
			user = await UserModel.create({
				email,
				name,
				phone,
				role: "client" as any
			});
		}

		if (!user) {
			throw new Error("Failed to find or create user");
		}

		// 3. Find or Create Guest record for this event/user
		let guest = await GuestModel.find({ userId: user.id, eventId });
		if (!guest) {
			guest = await GuestModel.create({
				userId: user.id,
				eventId,
				relation,
				phone
			} as any);
		}

		if (!guest) {
			throw new Error("Failed to find or create guest");
		}

		// 4. Create EventGuest relation
		const eventGuestRecord = await Model.create({
			eventId,
			guestId: guest.id,
			attending: input.attending ?? true
		});

		if (!eventGuestRecord) {
			throw new Error("Failed to create event guest relation");
		}

		// Fetch the full information to return
		const result = await Model.find({ id: eventGuestRecord.id });

		logger.info(`Event guest created successfully for email: ${email}`);
		return Resource.toJson(result as any);
	} catch (err: any) {
		throw err;
	}
};

const list = async (query: any) => {
	try {
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
