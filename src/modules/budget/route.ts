import { validate } from "@/middlewares/zodValidation";
import Controller from "./controller";
import {
  createBudgetCategorySchema,
  updateBudgetCategorySchema,
} from "./validators";

const routes = [
  {
    method: "post",
    controller: Controller.createBudgetCategory,
    path: "event/:eventId/budget-category/create",
    authorization: true,
    validation: validate(createBudgetCategorySchema),
  },
  {
    method: "get",
    controller: Controller.getAllBudgetCategories,
    path: "event/:eventId/budget-categories",
    authorization: true,
  },
  {
    method: "get",
    controller: Controller.getBudgetCategory,
    path: "budget-category/:categoryId",
    authorization: true,
  },
  {
    method: "patch",
    controller: Controller.updateBudgetCategory,
    path: "budget-category/:categoryId",
    authorization: true,
    validation: validate(updateBudgetCategorySchema),
  },
  {
    method: "delete",
    controller: Controller.deleteBudgetCategory,
    path: "budget-category/:categoryId",
    authorization: true,
  },
];

export default routes;
