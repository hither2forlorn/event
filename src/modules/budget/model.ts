import { eq } from "drizzle-orm";
import { budget_category } from "./schema";
import event from "../event/schema";
import db from "@/config/db";
import { CreateBudgetCategoryInput } from "./validators";

class Budget {
  // this is for checking the total estimated budget of all categories for a given event, we will sum up the estimated budget of all categories and return the total
  // also when adding new category we will check if the total estimated budget of all categories is less than the allocated budget of the event, if not we will throw an error
  static async totalEstimatedBudgetofAllCategoriesAndRemainingBudgetToAllocate(
    eventId: number,
  ) {
    const result = await db
      .select()
      .from(budget_category)
      .where(eq(budget_category.eventId, eventId));

    const totalEstimatedBudget = result.reduce(
      (total, category) => total + Number(category.allocatedBudget),
      0,
    );

    const totalBudget = await db
      .select({ budget: event.budget })
      .from(event)
      .where(eq(event.id, eventId));

    const remainingBudgetToAllocate =
      (totalBudget[0]?.budget ?? 0) - totalEstimatedBudget;
    return {
      totalEstimatedBudget,
      remainingBudgetToAllocate,
    };
  }

  static async createBudgetCategory(
    params: CreateBudgetCategoryInput & { eventId: number },
  ) {
    const result = await db
      .insert(budget_category)
      .values({ ...params, allocatedBudget: params.allocatedBudget.toString() })
      .returning();

    return result[0];
  }

  static async getBudgetCategoryById(categoryId: number) {
    const result = await db
      .select()
      .from(budget_category)
      .where(eq(budget_category.id, categoryId));

    return result[0] || null;
  }

  static async getAllBudgetCategories(eventId: number) {
    const result = await db
      .select()
      .from(budget_category)
      .where(eq(budget_category.eventId, eventId));

    return result;
  }

  static async updateBudgetCategory(
    categoryId: number,
    params: Partial<CreateBudgetCategoryInput>,
  ) {
    const updateData: any = {};
    if (params.name) updateData.name = params.name;
    if (params.allocatedBudget)
      updateData.allocatedBudget = params.allocatedBudget.toString();

    const result = await db
      .update(budget_category)
      .set(updateData)
      .where(eq(budget_category.id, categoryId))
      .returning();

    return result[0] || null;
  }

  static async deleteBudgetCategory(categoryId: number) {
    const result = await db
      .delete(budget_category)
      .where(eq(budget_category.id, categoryId))
      .returning();

    return result[0] || null;
  }
}

export default Budget;
