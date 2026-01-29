import type { IAuthRequest } from "@/routes/index";
import Service from "./service";
import logger from "@/config/logger";

const get = async (req: IAuthRequest) => {
	try {
		const data = await Service.list(req?.query);
		return data;
	} catch (err: any) {
		throw (err);
	}
};
const getByEventId = async (req: IAuthRequest) => {
	try {
		const { id } = req.params;
		const data = await Service.listByEventId(Number(id), req?.query);
		return data;
	} catch (err: any) {
		throw (err);
	}
};
const getById = async (req: IAuthRequest) => {
	try {
		const { id } = req.params;
		const data = await Service.findById(Number(id));
		return data;
	} catch (err: any) {
		throw (err);
	}
};
const create = async (req: IAuthRequest) => {
	try {
		const { body } = req;
		// Logic for the check of the same password
		const data = await Service.create(body);
		return data;
	} catch (err: any) {
		throw (err);
	}
};

const update = async (req: IAuthRequest) => {
	try {
		const { user, body } = req;
		const data = await Service.update(body, user?.id);
		return data;
	} catch (err: any) {
		throw (err);
	}
};

const deleteModule = async (req: Request) => {
	try {

		logger.info("This is the deletemodule")
		logger.info("Deleting module %s", req);
	} catch (err) {
		throw ("Validation error ");
	}

}
export default { create, get, getByEventId, getById, update, deleteModule }
