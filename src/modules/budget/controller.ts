import { IAuthRequest } from "@/routes";
import { throwNotFoundError } from "@/utils/error";
import Service from "./service";

const createBudgetCategory = async (req: IAuthRequest) => {
  try {
    const userId = req.user?.id;
    const eventId = Number(req.params.eventId);

    if (!eventId) {
      throwNotFoundError("Event");
    }

    const data = await Service.createBudgetCategory(req.body, userId, eventId);
    return data;
  } catch (error) {
    throw error;
  }
};

const getBudgetCategory = async (req: IAuthRequest) => {
  try {
    const userId = req.user?.id;
    const categoryId = Number(req.params.categoryId);

    if (!categoryId) {
      throwNotFoundError("Budget Category");
    }

    const data = await Service.getBudgetCategory(categoryId, userId);
    return data;
  } catch (error) {
    throw error;
  }
};

const getAllBudgetCategories = async (req: IAuthRequest) => {
  try {
    const userId = req.user?.id;
    const eventId = Number(req.params.eventId);

    if (!eventId) {
      throwNotFoundError("Event");
    }

    const data = await Service.getAllBudgetCategories(eventId, userId);
    return data;
  } catch (error) {
    throw error;
  }
};

const updateBudgetCategory = async (req: IAuthRequest) => {
  try {
    const userId = req.user?.id;
    const categoryId = Number(req.params.categoryId);

    if (!categoryId) {
      throwNotFoundError("Budget Category");
    }

    const data = await Service.updateBudgetCategory(
      categoryId,
      req.body,
      userId,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteBudgetCategory = async (req: IAuthRequest) => {
  try {
    const userId = req.user?.id;
    const categoryId = Number(req.params.categoryId);

    if (!categoryId) {
      throwNotFoundError("Budget Category");
    }

    const data = await Service.deleteBudgetCategory(categoryId, userId);
    return data;
  } catch (error) {
    throw error;
  }
};

const addExpenseToCategory = async (req: IAuthRequest) => {
  try {
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
