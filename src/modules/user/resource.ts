

export interface UserColumn {
	id: number;
	name: string;
	token: string | "";
	info: any;
	password: string;
	email: string;
	city: string;
	zip: string;
	address: string;
	coverPhoto: string;
	photo: string;
	country: string;
	bio: string,
	location: string;
	phone: string;
	createdAt: Date;
	updatedAt: Date;
}
class Resource {
	static toJson(user: UserColumn): Partial<UserColumn> | null {
		if (!user) return null;
		const data: Partial<UserColumn> = {
			id: user.id,
			name: user.name,
			phone: user.phone,
			token: user.token,
			email: user.email,
			location: user.location,
			bio: user.bio,
			photo: user.photo,
			country: user.country,
			city: user.city,
			address: user.address,
			zip: user.zip,
			coverPhoto: user.coverPhoto,
			info: user.info,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
		return data;
	}
	static collection(users: UserColumn[]) {
		return users.map(this.toJson);
	}
}

export default Resource;
