import { z } from "zod";

const BusinessValidationSchema = z.object({
  business_name: z.string().min(1, "Business name is required"),
  description: z.string().optional(),
  avatar: z.string().optional(),
  cover: z.string().optional(),
  location: z.string().optional(),
  legal_document: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  website: z.string().url("Invalid URL format").optional().or(z.literal("")),
  category: z.string().optional(),
  subcategory: z.string().optional(),
});

const BusinessUpdateValidationSchema = BusinessValidationSchema.partial();

type BusinessInputType = z.infer<typeof BusinessValidationSchema>;
type BusinessUpdateType = z.infer<typeof BusinessUpdateValidationSchema>;

export {
  BusinessValidationSchema,
  BusinessUpdateValidationSchema,
  type BusinessInputType,
  type BusinessUpdateType,
};
