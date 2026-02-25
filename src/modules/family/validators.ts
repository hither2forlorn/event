import z from "zod";

const familyIdParamValidation = z.object({
  params: z.object({
    id: z.coerce.number().int().positive("Family ID must be a positive number"),
  }),
});

const familyAndMemberIdParamValidation = z.object({
  params: z.object({
    id: z.coerce.number().int().positive("Family ID must be a positive number"),
    memberId: z.coerce
      .number()
      .int()
      .positive("Member ID must be a positive number"),
  }),
});

const createFamilyValidation = z.object({
  body: z.object({
    familyName: z
      .string()
      .min(3, "Family name must be at least 3 characters long"),
  }),
});

const updateFamilyValidation = z.object({
  params: z.object({
    id: z.coerce.number().int().positive("Family ID must be a positive number"),
  }),
  body: z
    .object({
      familyName: z
        .string()
        .min(3, "Family name must be at least 3 characters long")
        .optional(),
    })
    .refine((body) => Object.keys(body).length > 0, {
      message: "At least one field is required to update family",
    }),
});

const addMemberValidation = z.object({
  params: z.object({
    id: z.coerce.number().int().positive("Family ID must be a positive number"),
  }),
  body: z.object({
    relation: z.string().min(3, "Relation must be at least 3 characters long"),
    dob: z.coerce.date(),
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
  }),
});

const updateMemberValidation = z.object({
  params: z.object({
    id: z.coerce.number().int().positive("Family ID must be a positive number"),
    memberId: z.coerce
      .number()
      .int()
      .positive("Member ID must be a positive number"),
  }),
  body: z
    .object({
      relation: z
        .string()
        .min(3, "Relation must be at least 3 characters long")
        .optional(),
      dob: z.coerce.date().optional(),
      name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .optional(),
      email: z.string().email("Invalid email address").optional(),
    })
    .refine((body) => Object.keys(body).length > 0, {
      message: "At least one field is required to update member",
    }),
});

type CreateFamilyValidation = z.infer<typeof createFamilyValidation>;
type UpdateFamilyValidation = z.infer<typeof updateFamilyValidation>;
type AddMemberValidation = z.infer<typeof addMemberValidation>;
type UpdateMemberValidation = z.infer<typeof updateMemberValidation>;
type FamilyIdParamValidation = z.infer<typeof familyIdParamValidation>;
type FamilyAndMemberIdParamValidation = z.infer<
  typeof familyAndMemberIdParamValidation
>;

export {
  familyIdParamValidation,
  familyAndMemberIdParamValidation,
  createFamilyValidation,
  updateFamilyValidation,
  addMemberValidation,
  updateMemberValidation,
};

export type {
  CreateFamilyValidation,
  UpdateFamilyValidation,
  AddMemberValidation,
  UpdateMemberValidation,
  FamilyIdParamValidation,
  FamilyAndMemberIdParamValidation,
};
