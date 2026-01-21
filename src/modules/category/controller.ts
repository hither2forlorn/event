import { type IAuthRequest } from "@/routes/index";
import Service from "./service";
import { throwErrorOnValidation } from "@/utils/error";

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
		const data = await Service.create(req.body);
		return data;
	} catch (err: any) {
		throw err;
	}
};

const findOne = async (req: IAuthRequest) => {
	try {
		const { id } = req.params;
		if (!id || isNaN(Number(id))) {
			throwErrorOnValidation("Invalid ID");
		}
		const data = await Service.find(Number(id));
		return data;
	} catch (err: any) {
		throw err;
	}
};

const update = async (req: IAuthRequest) => {
	try {
		const { id } = req.params;
		if (!id || isNaN(Number(id))) {
			throwErrorOnValidation("Invalid ID");
		}
		const data = await Service.update(Number(id), req.body);
		return data;
	} catch (err: any) {
		throw err;
	}
};

const deleteModule = async (req: IAuthRequest) => {
	try {
		const { id } = req.params;
		if (!id || isNaN(Number(id))) {
			throwErrorOnValidation("Invalid ID");
		}
		const data = await Service.remove(Number(id));
		return data;
	} catch (err: any) {
		throw err;
	}
};

export default {
	get,
	create,
	findOne,
	update,
	deleteModule,
};
