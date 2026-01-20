import Model from "./model";
import type { AdminColumn } from "./resource";
import admins from "./schema";
const selectQuery = {
	id: admins.id,
	name: admins.name,
	email: admins.email,
	username: admins.username,
	avatar: admins.avatar,
	deviceTokens: admins.deviceTokens,
	info: admins.info,
	createdAt: admins.createdAt,
};
const updateDeviceToken = async (data: AdminColumn, deviceToken: string) => { // in the new login you would want to also update the admin information 
	try {
		const params: any = {
			deviceTokens: [],
		};
		if (!!data?.deviceTokens && Array.isArray(data?.deviceTokens)) {
			const findToken = data?.deviceTokens?.find(
				(token: any) => token == deviceToken
			);
			if (!findToken) {
				params.deviceTokens = [...data?.deviceTokens, deviceToken];
			} else {
				params.deviceTokens = data?.deviceTokens;
			}
		} else {
			params.deviceTokens = [deviceToken];
		}

		return await Model.update(params, data?.id);
	} catch (err: any) {
		throw new Error(err);
	}
};
export default {
	selectQuery,
	updateDeviceToken,
};
