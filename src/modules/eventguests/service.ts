import logger from "@/config/logger";
import Model from "./model";
import { throwErrorOnValidation } from "@/utils/error";
import Resource, { EventGuests } from "./resource";

const create = async (input: Partial<EventGuests>) => {
	try {
		const { email } = input;
		//should have the event and should have the guest with the uset id 

		const duplicateAdmin = await Model.find({ email });

		//Check if the guest is in the db or not 
		// if not then create the guest in the db
		// if yes then just add the guest to the event

		if (duplicateAdmin) {
			throwErrorOnValidation("Guest with this email already exists");
		}


		const admin = await Model.create({ ...input });

		logger.info(`Admin created successfully with email: ${email}`);
		return Resource.toJson(admin as any);
	} catch (err: any) {
		throw err;
	}
};

export default {
	create
};
