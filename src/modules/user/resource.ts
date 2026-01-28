import { roleEnum } from "./attributes";

export interface UserColumn {
	id: number;
	info: any;
	password: string;
	email: string;
	phone: string;
	role: typeof roleEnum;
	createdAt: Date;
	infos: any;
}
class Resource {
	static toJson(user: UserColumn): Partial<UserColumn> | null {
		if (!user) return null;
		const data: Partial<UserColumn> = {
			id: user.id,
			phone: user.phone,
			info: user.info,
			email: user.email,
			role: user.role,
			createdAt: user.createdAt,
		};
		return data;
	}
	static collection(users: UserColumn[]) {
		return users.map(this.toJson);
	}
}

export default Resource;
