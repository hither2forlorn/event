import { pgTable } from "drizzle-orm/pg-core";
import {
  budgetCategoryTableName,
  budgetCateogryAttributes,
  expenseTableName,
  expenseAttributes,
  paymentTableName,
  paymentAttributes,
  paymentModeEnum,
  paymentStatusEnum,
} from "./attribute";

const budget_category = pgTable(
  budgetCategoryTableName,
  budgetCateogryAttributes,
);

const expense = pgTable(expenseTableName, expenseAttributes);

const payment = pgTable(paymentTableName, paymentAttributes);

export {
  budget_category,
  expense,
  payment,
  paymentModeEnum,
  paymentStatusEnum,
};
