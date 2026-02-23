import z from "zod";

const createFamilyValidation = z.object({
  body: z.object({
    familyName: z
      .string()
      .min(3, "Family name must be at least 3 characters long"),
  }),
});

const updateFamilyValidation = z.object({
  familyName: z
    .string()
    .min(3, "Family name must be at least 3 characters long")
    .optional(),
});

type createFamilyValidation = z.infer<typeof createFamilyValidation>;
type updateFamilyValidation = z.infer<typeof updateFamilyValidation>;

export { createFamilyValidation, updateFamilyValidation };
