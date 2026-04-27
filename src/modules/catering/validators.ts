import { z } from "zod";

const futureDate = z.coerce.date().refine(
  (date) => date.getTime() > Date.now(),
  {
    message: "Date must be in the future",
  }
);

export const CreateCateringSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, "Catering name is required").max(255, "Name cannot exceed 255 characters"),
      per_plate_price: z.coerce.number().positive("Price must be a positive number"),
      startDateTime: futureDate,
      endDateTime: z.coerce.date(),
      meal_type: z.string().min(1, "Meal type is required").max(255, "Meal type cannot exceed 255 characters"),
      vendorId: z.number().int().positive().optional(),
    })
    .refine((data) => data.endDateTime > data.startDateTime, {
      message: "End date must be after start date",
      path: ["endDateTime"],
    }),
  params: z.object({
    eventId: z.coerce.number().int().positive("Valid event ID required"),
  }),
  query: z.object({}).optional(),
});

export const UpdateCateringSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, "Catering name is required").max(255, "Name cannot exceed 255 characters").optional(),
      per_plate_price: z.coerce.number().positive("Price must be a positive number").optional(),
      startDateTime: z.coerce.date().optional(),
      endDateTime: z.coerce.date().optional(),
      meal_type: z.string().min(1, "Meal type is required").max(255, "Meal type cannot exceed 255 characters").optional(),
      vendorId: z.number().int().positive().optional(),
    })
    .strict()
    .refine(
      (data) => !data.startDateTime || !data.endDateTime || data.endDateTime > data.startDateTime,
      {
        message: "End date must be after start date",
        path: ["endDateTime"],
      }
    ),
  params: z.object({
    id: z.coerce.number().int().positive("Valid catering ID required"),
  }),
  query: z.object({}).optional(),
});

export const GetCateringListSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    eventId: z.coerce.number().int().positive().optional(),
  }),
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
      name: z.string().min(1, "Menu item name is required").max(255, "Name cannot exceed 255 characters"),
      description: z.string().min(1, "Description is required").max(255, "Description cannot exceed 255 characters"),
      type: z.string().min(1, "Type is required").max(255, "Type cannot exceed 255 characters"),
      menuType: z.string().min(1, "Menu type is required").max(255, "Menu type cannot exceed 255 characters"),
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
      name: z.string().min(1, "Menu item name is required").max(255, "Name cannot exceed 255 characters").optional(),
      description: z.string().min(1, "Description is required").max(255, "Description cannot exceed 255 characters").optional(),
      type: z.string().min(1, "Type is required").max(255, "Type cannot exceed 255 characters").optional(),
      menuType: z.string().min(1, "Menu type is required").max(255, "Menu type cannot exceed 255 characters").optional(),
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
