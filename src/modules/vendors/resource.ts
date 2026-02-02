export interface VendorColumn {
	id: number;
	vendorName: string;
	description: string;
	owner: number;
	city: string;
	nation: string;
	culture: string;
	theme: string;
	space: string;
	infos: any;
	createdAt: Date;
	updatedAt: Date;
	ownerName?: string;
	owner_email?: string;
	deviceTokens?: Array<string>;
}
class Resource {
	static toJson(vendors: VendorColumn): Partial<VendorColumn> | null {
		if (!vendors) return null;
		const data = {
			id: vendors.id,
			vendorName: vendors.vendorName,
			description: vendors.description,
			owner: vendors.owner,
			city: vendors.city,
			nation: vendors.nation,
			culture: vendors.culture,
			theme: vendors.theme,
			space: vendors.space,
			infos: vendors?.infos || null,
			createdAt: vendors.createdAt,
			updatedAt: vendors.updatedAt,
			ownerName: vendors.ownerName,
			owner_email: vendors.owner_email,
		};
		return data;
	}
	static collection(ventures: VendorColumn[]) {
		return ventures.map(this.toJson);
	}
}
export default Resource;


