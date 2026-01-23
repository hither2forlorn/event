//import { throwErrorOnValidation } from "@/utils/error";
import type { IAuthRequest } from "@/routes/index";
import Service from "./service";
//import logger from "@/config/logger";

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
		const { body, user } = req;
		if (user?.id !== 1) throw ("Unauthorized"); // Only super admin can create the new user 
		// Logic for the check of the same password

		const data = await Service.create(body);
		return data;
	} catch (err: any) {
		throw (err);
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
		throw (err);
	}
};
// const update = async (req: IAuthRequest) => {
// 	try {
// 		const { user, body } = req;
// 		const data = await Service.changePassword(user?.id, body);
// 		return data;
// 	} catch (err: any) {
// 		throw (err);
// 	}
// };
const changePassword = async (req: IAuthRequest) => {
	try {
		const { user, body } = req;
		const data = await Service.changePassword(body, user?.id);
		return data;
	} catch (err: any) {
		throw (err);
	}
};
export default { login, create, get, changePassword }
