export interface VendorColumn {
	id: number;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	deviceTokens?: Array<string>;
	infos: any;
}
class Resource {
	static toJson(ventures: VendorColumn): Partial<VendorColumn> | null {
		if (!ventures) return null;
		const data: Partial<VendorColumn> = {
			id: ventures.id,
			name: ventures.name,
			email: ventures.email,
			infos: ventures?.infos || null,
			createdAt: ventures.createdAt,
		};
		return data;
	}
	static collection(ventures: VendorColumn[]) {
		return ventures.map(this.toJson);
	}
}
export default Resource;
