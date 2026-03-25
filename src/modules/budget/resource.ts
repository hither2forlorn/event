export interface BudgetCategoryColumn {
  id: number;
  name: string;
  eventId: number;
  allocatedBudget: string | number;
  createdAt: Date | null;
  updatedAt: Date | null;
}

class Resource {
  static toJson(
    category: Partial<BudgetCategoryColumn>,
  ): Partial<BudgetCategoryColumn> | null {
    if (!category) return null;
    const data: Partial<BudgetCategoryColumn> = {
      id: category.id,
      name: category.name,
      eventId: category.eventId,
      allocatedBudget: category.allocatedBudget,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
    return data;
  }

  static collection(category: Partial<BudgetCategoryColumn>[]) {
    return category.map((cat) => this.toJson(cat));
  }
}

export default Resource;
