import Model from "./model";
import type { VendorColumn } from "./resource";
import vendors from "./schema";
const selectQuery = {
	id: vendors.id,
	space: vendors.space,
	info: vendors.infos,
	createdAt: vendors.createdAt,
};
const updateDeviceToken = async (data: VendorColumn, deviceToken: string) => { // in the new login you would want to also update the admin information 
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
