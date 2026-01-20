import type { ImageInput } from "../../interface/index";
export interface AdminColumn {
	id: number;
	name: string;
	username: string;
	email: string;
	avatar: string | ImageInput | null;
	createdAt: Date;
	token?: string;
	deviceTokens?: Array<string>;
	role: string;
	infos: any;
}
class Resource {
	static toJson(admin: AdminColumn): Partial<AdminColumn> | null {
		if (!admin) return null;
		const data: AdminColumn = {
			id: admin.id,
			name: admin.name,
			username: admin.username,
			email: admin.email,
			role: "admin",
			avatar: admin?.avatar || null,
			infos: admin?.infos || null,
			createdAt: admin.createdAt,
		};

		if (!!admin.token) {
			data.token = admin.token;
		}

		return data;
	}
	static collection(admins: AdminColumn[]) {
		return admins.map(this.toJson);
	}
}

export default Resource;
