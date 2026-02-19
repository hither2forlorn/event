import type { IAuthRequest } from "@/routes/index";
import Service from "./service";
import logger from "@/config/logger";

const get = async (req: IAuthRequest) => {
	try {
		const data = await Service.list(req?.query);
		return data;
	} catch (err: any) {
		throw err;
	}
};
const create = async (req: IAuthRequest) => {
	try {
		const { body } = req;
		const data = await Service.create(body);
		return data;
	} catch (err: any) {
		throw err;
	}
};
const login = async (req: Request) => {
	try {
		const { body, headers }: any = req;
		const data = await Service.login({
			...body,
			host: headers?.host,
			userAgent: headers["user-agent"],
		});
		return data;
	} catch (err: any) {
		throw err;
	}
};

const changePassword = async (req: IAuthRequest) => {
	try {
		const { user, body } = req;
		const data = await Service.changePassword(body, user?.id.toString()); // Update this in the token while in the middleware
		return data;
	} catch (err: any) {
		throw err;
	}
};
const deleteModule = async (req: Request) => {
	try {
		logger.info("This is the deletemodule");
		logger.info("Deleting module %s", req);
	} catch (err) {
		throw "Validation error ";
	}
};
export default {
	login,
	create,
	get,
	changePassword,
	deleteModule,
};
