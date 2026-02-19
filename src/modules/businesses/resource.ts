export interface BuisnessColumn {
	id: string,
	buisness_name: string,
	avatar: string,
	cover: string,
	location: string,
	legal_docuemnt: string
}
class Resource {
	static toJson(user: BuisnessColumn): Partial<BuisnessColumn> | null {
		if (!user) return null;
		const data: Partial<BuisnessColumn> = {
			id: user.id,
			name: user.name,
			phone: user.phone,
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
