import { throwErrorOnValidation } from "@/utils/error";
import type { IAuthRequest } from "@/routes/index";
import logger from "@/config/logger";
import Service from "./service"
const get = async (req: IAuthRequest) => {
	try {
		const data = await Service.list(req?.query);
		return data;
	} catch (err: any) {
		throw (err);
	}
};
const create = async (req: IAuthRequest) => {
	try {
		const { body } = req;
		const data = await Service.create(body);
		return data;
	} catch (err: any) {
		throw (err);
	}
};
const changePassword = async (req: IAuthRequest) => {
	try {
		const { user, body } = req;
		const data = await Service.changePassword(body, user?.id);
		return data;
	} catch (err: any) {
		throw (err);
	}
};
const remove = async (req: IAuthRequest) => {
	try {
		const { id } = req.params;
		const { body } = req;
		const data = await Service.remove(body, id);
		return data;
	} catch (err: any) {
		throw (err);
	}
}
export default { create, get, changePassword, remove }
