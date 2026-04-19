import { z } from "zod";

export const CreateCateringSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(1, "Catering name is required")
        .max(255, "Name cannot exceed 255 characters"),
      per_plate_price: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
      startDateTime: z.coerce
        .date()
        .min(new Date(), "Start date must be in future"),
      endDateTime: z.coerce.date(),
      vendorId: z.number().int().positive().optional().nullable(),
    })
    .strict(),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const UpdateCateringSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(1, "Catering name is required")
        .max(255, "Name cannot exceed 255 characters")
        .optional(),
      per_plate_price: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format")
        .optional(),
      startDateTime: z.coerce.date().optional(),
      endDateTime: z.coerce.date().optional(),
      vendorId: z.number().int().positive().optional().nullable(),
    })
    .strict(),
  params: z.object({
    id: z.coerce.number().int().positive("Valid catering ID required"),
  }),
  query: z.object({}).optional(),
});

export const GetCateringListSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z
    .object({
      page: z.coerce.number().int().positive().default(1),
      limit: z.coerce.number().int().positive().default(10),
      eventId: z.coerce.number().int().positive().optional(),
    })
    .optional(),
});

export const GetSingleCateringSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({
    id: z.coerce.number().int().positive("Valid catering ID required"),
  }),
  query: z.object({}).optional(),
});

export const DeleteCateringSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({
    id: z.coerce.number().int().positive("Valid catering ID required"),
  }),
  query: z.object({}).optional(),
});

export const CreateMenuItemSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(1, "Menu item name is required")
        .max(255, "Name cannot exceed 255 characters"),
      description: z
        .string()
        .min(1, "Description is required")
        .max(255, "Description cannot exceed 255 characters"),
      type: z.string().min(1, "Menu type is required").max(255),
      isVegetarian: z.boolean().default(false),
    })
    .strict(),
  params: z.object({
    cateringId: z.coerce.number().int().positive("Valid catering ID required"),
  }),
  query: z.object({}).optional(),
});

export const UpdateMenuItemSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(1, "Menu item name is required")
        .max(255, "Name cannot exceed 255 characters")
        .optional(),
      description: z
        .string()
        .min(1, "Description is required")
        .max(255, "Description cannot exceed 255 characters")
        .optional(),
      type: z.string().min(1, "Menu type is required").max(255).optional(),
      isVegetarian: z.boolean().optional(),
    })
    .strict(),
  params: z.object({
    id: z.coerce.number().int().positive("Valid menu item ID required"),
  }),
  query: z.object({}).optional(),
});

export type CreateCateringType = z.infer<typeof CreateCateringSchema>;
export type UpdateCateringType = z.infer<typeof UpdateCateringSchema>;
export type GetCateringListType = z.infer<typeof GetCateringListSchema>;
export type GetSingleCateringType = z.infer<typeof GetSingleCateringSchema>;
export type DeleteCateringType = z.infer<typeof DeleteCateringSchema>;
export type CreateMenuItemType = z.infer<typeof CreateMenuItemSchema>;
export type UpdateMenuItemType = z.infer<typeof UpdateMenuItemSchema>;
