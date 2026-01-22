export interface CategoryColumn {
	id: number,
	parentId: number | null,
	title: string | null,
	question: any, // Can be QuestionType or null
	createdAt: Date | null,
	infos: any,
	updatedAt: Date | null
}
class Resource {
	static toJson(category: Partial<CategoryColumn>): Partial<CategoryColumn> | null {
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
	static collection(category: Partial<CategoryColumn>[]) {
		return category.map(this.toJson);
	}
}
export default Resource;
