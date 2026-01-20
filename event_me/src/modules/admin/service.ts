import {
	changePasswordValidationSchema,
	loginValidationSchema,
	validationSchema,
} from "./validators";
import Model from "./model";
import { verify_retailer_status } from "@/modules/retailer/validators"
import { PASSWORD_LENGTH } from "@/constant"
import Mail from "@/modules/mails/service"
import Repository from "./repository";
import Resource from "./resource.ts";
import Token from "@/utils/token";
import RetailerModel from "@/modules/retailer/model";
import RetailerColumn from "../retailer/resource.ts";
import bcrypt from "bcryptjs";
import logger from "@/config/logger";
import { ErrorLiteral } from "@/utils/helper.ts";
import { throwNotFoundError } from "@/utils/error.ts";
import Wallet from "../wallet/model.ts";

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
	try {
		const { error } = await verify_retailer_status.validateAsync(params);
		if (error) {
			throw error;
		}
		const retailerInfo = await RetailerModel.find({ id: retailerId });
		if (retailerInfo?.verified == true) {
			console.error("Retailer is already verified");
			return "Retailer is already verified";
		}
		if (retailerInfo?.id != null && retailerInfo?.id != undefined) {
			const temp_password = Token.tempPasswordGenerator(PASSWORD_LENGTH);
			const hashedTempPass = await Token.hashPassword(temp_password);
			const data: any = await RetailerModel.verify_retailer({ commission_rate: params.commission_rate, password: hashedTempPass }, retailerInfo?.id);
			logger.debug("data ", data);
			await Mail.sendMail(retailerInfo.email, 'Retailer Account verification ',
				`You have Been verified by the Admin \nTo start with the application login with the Email :${data.email}\nPassword: ${temp_password} otp will be accepted only by Phone number : ${data.phone.split("+977").pop()}`
			);
			await Wallet.create({ retailer_id: retailerId, amount: "0" }); // Making the wallet once the retialer is verified
			const filtered_data = RetailerColumn.toJson(data);
			return filtered_data;
		} else {
			throwNotFoundError("Retailer with info not found");
		}
	} catch (err: any) {
		throw err;
	}

}
const create = async (input: any) => {
	try {
		const { error }: any = await validationSchema.validateAsync(input);
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
		const { error }: any = await loginValidationSchema.validateAsync(input);
		if (!!error) {
			throw new Error(error?.details[0].message);
		}
		const data: any = await Model.find({
			username: input?.username,
		});
		console.log('The informarion of the user is ', data);

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
						role: "admin",
						permissions: data.permissions || [],
						host: input?.host,
						userAgent: input?.userAgent,
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
		const { error } = await changePasswordValidationSchema.validateAsync(input);
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
	verify_retailer,
	remove,
};
