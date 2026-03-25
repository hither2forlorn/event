import { z } from "zod";

const createBudgetCategorySchema = z.object({
  params: z.object({
    eventId: z.coerce.number().positive(),
  }),
  body: z.object({
    name: z.string().max(255),
    allocatedBudget: z.number().positive(),
  }),
});

const updateBudgetCategorySchema = z.object({
  params: z.object({
    categoryId: z.coerce.number().positive(),
  }),
  body: z.object({
    name: z.string().max(255).optional(),
    allocatedBudget: z.number().positive().optional(),
  }),
});

type CreateBudgetCategoryInput = z.infer<
  typeof createBudgetCategorySchema
>["body"];

export {
  createBudgetCategorySchema,
  updateBudgetCategorySchema,
  type CreateBudgetCategoryInput,
};
