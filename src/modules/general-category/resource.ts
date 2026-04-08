export interface GeneralCategoryColumn {
  id?: number;
  name: string;
  type: string;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

class Resource {
  static toJson(
    category: Partial<GeneralCategoryColumn>,
  ): Partial<GeneralCategoryColumn> | null {
    if (!category) return null;
    const data: Partial<GeneralCategoryColumn> = {
      id: category.id,
      name: category.name,
      type: category.type,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
    return data;
  }

  static collection(categories: Partial<GeneralCategoryColumn>[]) {
    return categories.map((cat) => this.toJson(cat)).filter(Boolean);
  }
}

export default Resource;
