export interface CategoryColumn {
	id: number,
	parentId: number,
	title: string,
	question: string, // This will be dedkkk
	createdAt: any,
	infos: any,
	updatedAt: any
}
class Resource {
	static toJson(category: CategoryColumn): Partial<CategoryColumn> | null {
		if (!category) return null;
		const data: Partial<CategoryColumn> = {
			id: category.id,
			title: category.title,
			question: category.question,
			infos: category?.infos || null,
			createdAt: category.createdAt,
		};
		return data;
	}
	static collection(category: CategoryColumn[]) {
		return category.map(this.toJson);
	}
}
export default Resource;
