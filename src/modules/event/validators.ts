import { z } from "zod";

const EventValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  type: z.string(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  duration: z.string().optional(),
  parentid: z.number().int().optional(),
  location: z.string().optional(),
  organizer: z.number().int().optional(),
});

const EventUpdateValidationSchema = EventValidationSchema.partial();

export { EventValidationSchema, EventUpdateValidationSchema };
