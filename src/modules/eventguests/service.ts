import logger from "@/config/logger";
import Model from "./model";
import { throwErrorOnValidation } from "@/utils/error";
import Resource, { EventGuests } from "./resource";

const create = async (input: Partial<EventGuests>) => {
	try {
		const { email } = input;
		//should have the event and should have the guest with the uset id 
		const duplicateEventGuest = await Model.find({ email });
		if (!!duplicateEventGuest) {
			throwErrorOnValidation("Guest with this email already exists");
		}
		//Check if the guest is in the db or not 
		// if not then create the guest in the db
		// if yes then just add the guest to the event

		const admin = await Model.create({ ...input });

		logger.info(`Admin created successfully with email: ${email}`);
		return Resource.toJson(admin as any);
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
