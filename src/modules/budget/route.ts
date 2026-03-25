import { validate } from "@/middlewares/zodValidation";
import Controller from "./controller";
import {
  createBudgetCategorySchema,
  updateBudgetCategorySchema,
  addExpenseToCategorySchema,
  updateExpenseSchema,
  addPaymentToExpenseSchema,
  updatePaymentSchema,
} from "./validators";

const routes = [
  {
    method: "post",
    path: "event/:eventId/budget-category/create",
    controller: Controller.createBudgetCategory,
    authorization: true,
    validation: validate(createBudgetCategorySchema),
  },
  {
    method: "get",
    path: "event/:eventId/budget-categories",
    controller: Controller.getAllBudgetCategories,
    authorization: true,
  },
  {
    method: "get",
    path: "budget-category/:categoryId",
    controller: Controller.getBudgetCategory,
    authorization: true,
  },
  {
    method: "patch",
    path: "budget-category/:categoryId",
    controller: Controller.updateBudgetCategory,
    authorization: true,
    validation: validate(updateBudgetCategorySchema),
  },
  {
    method: "delete",
    path: "budget-category/:categoryId",
    controller: Controller.deleteBudgetCategory,
    authorization: true,
  },

  {
    method: "get",
    path: "event/:eventId/budget-summary",
    controller: Controller.getBudgetSummary,
    authorization: true,
  },

  {
    method: "post",
    path: "budget-category/:categoryId/expense/create",
    controller: Controller.addExpenseToCategory,
    authorization: true,
    validation: validate(addExpenseToCategorySchema),
  },
  {
    method: "get",
    path: "budget-category/:categoryId/expenses",
    controller: Controller.getAllExpensesByCategory,
    authorization: true,
  },
  {
    method: "get",
    path: "expense/:expenseId",
    controller: Controller.getExpense,
    authorization: true,
  },
  {
    method: "patch",
    path: "expense/:expenseId",
    controller: Controller.updateExpense,
    authorization: true,
    validation: validate(updateExpenseSchema),
  },
  {
    method: "delete",
    path: "expense/:expenseId",
    controller: Controller.deleteExpense,
    authorization: true,
  },

  {
    method: "post",
    path: "expense/:expenseId/payment/create",
    controller: Controller.addPaymentToExpense,
    authorization: true,
    validation: validate(addPaymentToExpenseSchema),
  },
  {
    method: "get",
    path: "expense/:expenseId/payments",
    controller: Controller.getAllPaymentsByExpense,
    authorization: true,
  },
  {
    method: "get",
    path: "payment/:paymentId",
    controller: Controller.getPayment,
    authorization: true,
  },
  {
    method: "patch",
    path: "payment/:paymentId",
    controller: Controller.updatePayment,
    authorization: true,
    validation: validate(updatePaymentSchema),
  },
  {
    method: "delete",
    path: "payment/:paymentId",
    controller: Controller.deletePayment,
    authorization: true,
  },
];

export default routes;
