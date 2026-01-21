export interface VenturesColumn {
	id: number;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	deviceTokens?: Array<string>;
	infos: any;
}
class Resource {
	static toJson(ventures: VenturesColumn): Partial<VenturesColumn> | null {
		if (!ventures) return null;
		const data: Partial<VenturesColumn> = {
			id: ventures.id,
			name: ventures.name,
			email: ventures.email,
			infos: ventures?.infos || null,
			createdAt: ventures.createdAt,
		};
		return data;
	}
	static collection(ventures: VenturesColumn[]) {
		return ventures.map(this.toJson);
	}
}
export default Resource;
