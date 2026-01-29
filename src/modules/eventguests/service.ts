import {
	validationSchema,
} from "./validators";
import z from "zod";
import logger from "@/config/logger";
import Model from "./model";
import { throwErrorOnValidation, throwNotFoundError } from "@/utils/error";
import Resource, { GuestColumn } from "./resource";
const list = async (params: any) => {
	try {
		const data: any = await Model.findAllAndCount(params);
		logger.debug("data ", data);
		return data;
	} catch (err: any) {
		throw err;
	}
};
const listByEventId = async (eventId: number, params: any) => {
	try {
		const data: any = await Model.findAllAndCount({ ...params, eventId });
		return data;
	} catch (err: any) {
		throw err;
	}
};
const findById = async (id: number) => {
	try {
		const guest = await Model.find({ id });
		if (!guest) {
			throwNotFoundError("Guest");
		}
		return Resource.toJson(guest as any);
	} catch (err: any) {
		throw err;
	}
};

const create = async (input: Partial<GuestColumn>) => {
	try {
		const { error, success } = await z.safeParseAsync(validationSchema, input);
		if (!success) {
			throwErrorOnValidation(
				error.issues.map((issue) => issue.message).join(", "),
			);
		}

		const { email } = input;

		const duplicateAdmin = await Model.find({ email });

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

const update = async (input: Partial<GuestColumn>, id: number) => {
	try {
		const guest = await Model.update(input, id);
		if (!guest || guest == undefined) {
			return throwNotFoundError("Guest");
		}
		return Resource.toJson(guest);
	} catch (error) {
		throw error;
	}
}


const find = async (id: number) => {
	try {
		const guest = await Model.find({ id });
		if (!guest) {
			throwNotFoundError("Guest");
		}
		return Resource.toJson(guest as any);
	} catch (error) {
		throw error;
	}
};



const remove = async (id: number) => {
	try {
		const admin = await Model.find({ id });
		if (!admin) {
			throwNotFoundError("Admin");
		}
		if (id === 1) {
			throwErrorOnValidation("Cannot delete super admin");
		}
		await Model.destroy(id);
		logger.info(`Admin ${id} deleted successfully`);
		return { message: "Admin deleted successfully" };
	} catch (error) {
		throw error;
	}
};

export default {
	list,
	listByEventId,
	create,
	update,
	find,
	findById,
	remove
};
