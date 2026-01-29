import { z } from "zod";

const EventValidationSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    type: z.string(),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    budget: z.number().int().min(0).optional(),
    theme: z.string().optional(),
    parentId: z.number().int().optional(),
    location: z.string().optional(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end >= start;
    },
    {
      message: "End date must be after or equal to start date",
      path: ["endDate"],
    },
  );

const EventUpdateValidationSchema = EventValidationSchema.partial().refine(
  (data) => {
    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end >= start;
    }
    return true;
  },
  {
    message: "End date must be after or equal to start date",
    path: ["endDate"],
  },
);

export { EventValidationSchema, EventUpdateValidationSchema };
