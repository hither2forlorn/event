import { budget_category } from "./schema";

const selectQuery = {
  id: budget_category.id,
  name: budget_category.name,
  eventId: budget_category.eventId,
  allocatedBudget: budget_category.allocatedBudget,
  createdAt: budget_category.createdAt,
  updatedAt: budget_category.updatedAt,
};

export default {
  selectQuery,
};
