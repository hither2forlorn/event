import {
	// changePasswordValidationSchema,
	// loginValidationSchema,
	validationSchema,
} from "./validators";
import Model from "./model";
import Repository from "./repository";
import Resource from "./resource";
import Token from "@/utils/token";
import bcrypt from "bcryptjs";
import logger from "@/config/logger";
import { ErrorLiteral } from "@/utils/helper";
import z from "zod";

const list = async (params: any) => {
	try {
		const data: any = await Model.findAllAndCount(params);
		logger.debug("data ", data);
		return data;
	} catch (err: any) {
		throw err;
	}
};
const create = async (input: any) => {
	try {
		const { error }: any = z.parse(validationSchema, input);
		if (!!error) {
			throw new Error(error?.details[0].message);
		}
		const { password, ...restInput } = input;// This input is obtain after passing through the controller so consider that before moving forward to the topic
		const existingUser = await Model.find({ email: restInput.email })
		if (!!existingUser) {
			logger.warn("admin with such information  already exist ");
			throw new Error(ErrorLiteral.ALREADY_EXIST);
		}
		if (!!input.permissions) {
			input.infos = {
				permissions: input.permissions
			}
		}
		const data: any = await Model.create({
			...restInput,
			password: bcrypt.hashSync(password, 10), //hash password with the salting function of the module 
		});
		const response = Resource.toJson(data);
		return response;
	} catch (err: any) {
		throw err;
	}
};
const login = async (input: any) => {
	try {
		const { error }: any = z.parse(validationSchema, input);
		if (!!error) {
			throw new Error(error?.details[0].message);
		}
		const data: any = await Model.find({
			email: input?.email,
		});
		if (!data?.id) {
			throw new Error("Invalid Credential");
		} else {
			const isMatch = await bcrypt.compare(input.password, data.password);
			if (!!isMatch) {
				const token = await Token.sign(
					{
						id: data.id,
						name: data.name,
						email: data.email,
						role: "vendors",
					},
					"7d"
				);
				if (!!input?.deviceToken) {
					await Repository.updateDeviceToken(data, input?.deviceToken);
				}
				data.token = token;

				const response = Resource.toJson(data);
				return response;
			} else {
				throw new Error("Invalid Credential");
			}
		}
	} catch (err: any) {
		throw err;
	}
};
const logout = async (input: any, id: number) => {
	try {
		const data: any = await Model.find({
			id,
		});
		if (input?.deviceToken) { // Remove the device token in the system 
			const filterToken: any = data?.deviceToken?.filter(
				(token: string) => token !== input?.deviceToken
			);
			await Model.update(
				{
					deviceTokens: filterToken || [],
				},
				id
			);
		}
		const response = Resource.toJson(data);
		return response;
	} catch (err: any) {
		throw err;
	}
};
const find = async (id: number) => {
	try {
		const data: any = await Model.find({
			id,
		});
		if (!data) {
			return [];
		}
		const response = Resource.toJson(data);
		return response;
	} catch (err: any) {
		throw err;
	}
};
const changePassword = async (input: any, id: number) => {
	try {
		const { error }: any = z.safeParse(validationSchema, input);
		if (!!error) {
			throw new Error(error?.details[0].message);
		}
		const data: any = await Model.find({
			id,
		});
		const isMatch = await bcrypt.compare(
			input?.currentPassword,
			data?.password
		);
		if (!isMatch) {
			throw new Error("Invalid Credential");
		}
		const hashedPassword = await Token.hashPassword(input?.newPassword);
		await Model.update(
			{ password: hashedPassword },
			data?.id
		);
		const response = Resource.toJson(data);
		return response;
	} catch (err: any) {
		throw err;
	}
};

const remove = async (id: number) => {
	try {
		const data: any = await Model.destroy(id);
		return data;
	} catch (err: any) {
		throw err;
	}
};
export default {
	list,
	create,
	login,
	logout,
	find,
	changePassword,
	// verify_retailer,
	remove,
};
