
import type { IAuthRequest } from "@/routes/index";
import Service from "./service";

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


export default { login, create, get }
