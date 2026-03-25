import { CreateBudgetCategoryInput } from "./validators";
import EventModel from "../event/model";
import { throwForbiddenError, throwNotFoundError } from "@/utils/error";
import Budget from "./model";

const createBudgetCategory = async (
  input: CreateBudgetCategoryInput,
  userId: number,
  eventId: number,
) => {
  try {
    // validating the user
    const isAuthorized = await EventModel.isUserEventAdmin(eventId, userId);

    if (!isAuthorized) {
      throwForbiddenError(
        "You do not have permission to create a budget category for this event.",
      );
    }

    // validating if the allocated budget is less then the remaining budget to allocate for the event
    const info =
      await Budget.totalEstimatedBudgetofAllCategoriesAndRemainingBudgetToAllocate(
        eventId,
      );

    if (input.allocatedBudget > info.remainingBudgetToAllocate) {
      throwForbiddenError(
        `The allocated budget for this category exceeds the remaining budget to allocate for the event. Remaining budget to allocate: ${info.remainingBudgetToAllocate}`,
      );
    }

    const category = await Budget.createBudgetCategory({
      name: input.name,
      allocatedBudget: input.allocatedBudget,
      eventId: eventId,
    });

    return category;
  } catch (error) {
    throw error;
  }
};

const getBudgetCategory = async (categoryId: number, userId: number) => {
  try {
    const category = await Budget.getBudgetCategoryById(categoryId);

    if (!category) {
      throwNotFoundError("Budget Category");
    }

    const isAuthorized = await EventModel.isUserEventAdmin(
      category!.eventId,
      userId,
    );

    if (!isAuthorized) {
      throwForbiddenError(
        "You do not have permission to view this budget category.",
      );
    }

    return category;
  } catch (error) {
    throw error;
  }
};

const getAllBudgetCategories = async (eventId: number, userId: number) => {
  try {
    const isAuthorized = await EventModel.isUserEventAdmin(eventId, userId);

    if (!isAuthorized) {
      throwForbiddenError(
        "You do not have permission to view budget categories for this event.",
      );
    }

    const categories = await Budget.getAllBudgetCategories(eventId);
    return categories;
  } catch (error) {
    throw error;
  }
};

const updateBudgetCategory = async (
  categoryId: number,
  input: Partial<CreateBudgetCategoryInput>,
  userId: number,
) => {
  try {
    const category = await Budget.getBudgetCategoryById(categoryId);

    if (!category) {
      throwNotFoundError("Budget Category");
    }

    const isAuthorized = await EventModel.isUserEventAdmin(
      category!.eventId,
      userId,
    );

    if (!isAuthorized) {
      throwForbiddenError(
        "You do not have permission to update this budget category.",
      );
    }

    // if updating allocatedBudget, validate against remaining budget
    if (
      input.allocatedBudget &&
      input.allocatedBudget !== Number(category!.allocatedBudget)
    ) {
      const info =
        await Budget.totalEstimatedBudgetofAllCategoriesAndRemainingBudgetToAllocate(
          category!.eventId,
        );

      const currentAllocated = Number(category!.allocatedBudget);
      const newAllocated = input.allocatedBudget;
      const difference = newAllocated - currentAllocated;

      if (difference > info.remainingBudgetToAllocate) {
        throwForbiddenError(
          `The new allocated budget exceeds the remaining budget. Remaining budget: ${info.remainingBudgetToAllocate}`,
        );
      }
    }

    const updatedCategory = await Budget.updateBudgetCategory(
      categoryId,
      input,
    );
    return updatedCategory;
  } catch (error) {
    throw error;
  }
};

const deleteBudgetCategory = async (categoryId: number, userId: number) => {
  try {
    const category = await Budget.getBudgetCategoryById(categoryId);

    if (!category) {
      throwNotFoundError("Budget Category");
    }

    const isAuthorized = await EventModel.isUserEventAdmin(
      category!.eventId,
      userId,
    );

    if (!isAuthorized) {
      throwForbiddenError(
        "You do not have permission to delete this budget category.",
      );
    }

    const deletedCategory = await Budget.deleteBudgetCategory(categoryId);
    return deletedCategory;
  } catch (error) {
    throw error;
  }
};

export default {
  createBudgetCategory,
  getBudgetCategory,
  getAllBudgetCategories,
  updateBudgetCategory,
  deleteBudgetCategory,
};
