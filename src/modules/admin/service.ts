import {
	changePasswordValidationSchema,
	loginValidationSchema,
	validationSchema,
} from "./validators";
import z from "zod"
import logger from "@/config/logger";
import Model from "./model";
import { throwErrorOnValidation, throwValidationError } from "@/utils/error";
const list = async (params: any) => {
	try {
		const data: any = await Model.findAllAndCount(params);
		logger.debug("data ", data);
		return data;
	} catch (err: any) {
		throw err;
	}
};
const verify_retailer = async (params: any, retailerId: number) => {
	console.log("verify_retailer - params:", params, "retailerId:", retailerId);
}
const create = async (input: any) => {
	try {
		console.log("create - input:", input);
		const { error, data, success } = await z.safeParseAsync(validationSchema, input);
		if (!success) {
			console.log('This is the failute');
			throwErrorOnValidation(error.message); // style this for the better formatting of the text 
		}
		console.log('data');
		return data;
	} catch (err: any) {
		throw err;
	}
};
const login = async (input: any) => {
	console.log("login - input:", input);
};
const logout = async (input: any, id: number) => {
	console.log("logout - input:", input, "id:", id);
};
const find = async (id: number) => {
	console.log("find - id:", id);
};
const changePassword = async (input: any, id: number) => {
	console.log("changePassword - input:", input, "id:", id);
};

const remove = async (id: number) => {
	console.log("remove - id:", id);
};
export default {
	list,
	create,
	login,
	logout,
	find,
	changePassword,
	verify_retailer,
	remove,
};
