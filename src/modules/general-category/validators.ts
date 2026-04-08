import { z } from "zod";

const generalCategoryValidationSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.string().max(50),
});

const generalCategoryUpdateValidationSchema =
  generalCategoryValidationSchema.partial();

export {
  generalCategoryValidationSchema,
  generalCategoryUpdateValidationSchema,
};
