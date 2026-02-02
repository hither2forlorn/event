import owner from "@/modules/user/schema";
import Model from "./model";
import type { VendorColumn } from "./resource";
import vendors from "./schema";
const selectQuery = {
	id: vendors.id,
	ownerName: owner.name,
	vendorName: vendors.vendorName,
	owner: owner.id,
	city: vendors.city,
	nation: vendors.nation,
	theme: vendors.theme,
	infos: vendors.infos,
	culture: vendors.culture,
	owner_email: owner.email,
	space: vendors.space,
	createdAt: vendors.createdAt,
	updatedAt: vendors.updatedAt
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
