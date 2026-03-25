import { IAuthRequest } from "@/routes";
import { throwNotFoundError } from "@/utils/error";
import Service from "./service";

const createBudgetCategory = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const eventId = Number(req.params.eventId);
  if (!eventId) throwNotFoundError("Event");
  return await Service.createBudgetCategory(req.body, userId, eventId);
};

const getBudgetCategory = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const categoryId = Number(req.params.categoryId);
  if (!categoryId) throwNotFoundError("Budget Category");
  return await Service.getBudgetCategory(categoryId, userId);
};

const getAllBudgetCategories = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const eventId = Number(req.params.eventId);
  if (!eventId) throwNotFoundError("Event");
  return await Service.getAllBudgetCategories(eventId, userId);
};

const updateBudgetCategory = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const categoryId = Number(req.params.categoryId);
  if (!categoryId) throwNotFoundError("Budget Category");
  return await Service.updateBudgetCategory(categoryId, req.body, userId);
};

const deleteBudgetCategory = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const categoryId = Number(req.params.categoryId);
  if (!categoryId) throwNotFoundError("Budget Category");
  return await Service.deleteBudgetCategory(categoryId, userId);
};

const getBudgetSummary = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const eventId = Number(req.params.eventId);
  if (!eventId) throwNotFoundError("Event");
  return await Service.getBudgetSummary(eventId, userId);
};

const addExpenseToCategory = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const categoryId = Number(req.params.categoryId);
  if (!categoryId) throwNotFoundError("Budget Category");
  return await Service.addExpenseToCategory(req.body, userId, categoryId);
};

const getExpense = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const expenseId = Number(req.params.expenseId);
  if (!expenseId) throwNotFoundError("Expense");
  return await Service.getExpense(expenseId, userId);
};

const getAllExpensesByCategory = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const categoryId = Number(req.params.categoryId);
  if (!categoryId) throwNotFoundError("Budget Category");
  return await Service.getAllExpensesByCategory(categoryId, userId);
};

const updateExpense = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const expenseId = Number(req.params.expenseId);
  if (!expenseId) throwNotFoundError("Expense");
  return await Service.updateExpense(expenseId, req.body, userId);
};

const deleteExpense = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const expenseId = Number(req.params.expenseId);
  if (!expenseId) throwNotFoundError("Expense");
  return await Service.deleteExpense(expenseId, userId);
};

const addPaymentToExpense = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const expenseId = Number(req.params.expenseId);
  if (!expenseId) throwNotFoundError("Expense");
  return await Service.addPaymentToExpense(req.body, userId, expenseId);
};

const getPayment = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const paymentId = Number(req.params.paymentId);
  if (!paymentId) throwNotFoundError("Payment");
  return await Service.getPayment(paymentId, userId);
};

const getAllPaymentsByExpense = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const expenseId = Number(req.params.expenseId);
  if (!expenseId) throwNotFoundError("Expense");
  return await Service.getAllPaymentsByExpense(expenseId, userId);
};

const updatePayment = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const paymentId = Number(req.params.paymentId);
  if (!paymentId) throwNotFoundError("Payment");
  return await Service.updatePayment(paymentId, req.body, userId);
};

const deletePayment = async (req: IAuthRequest) => {
  const userId = req.user?.id;
  const paymentId = Number(req.params.paymentId);
  if (!paymentId) throwNotFoundError("Payment");
  return await Service.deletePayment(paymentId, userId);
};

export default {
  createBudgetCategory,
  getBudgetCategory,
  getAllBudgetCategories,
  updateBudgetCategory,
  deleteBudgetCategory,
  getBudgetSummary,
  addExpenseToCategory,
  getExpense,
  getAllExpensesByCategory,
  updateExpense,
  deleteExpense,
  addPaymentToExpense,
  getPayment,
  getAllPaymentsByExpense,
  updatePayment,
  deletePayment,
};
