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

const EventUpdateValidationSchema = EventValidationSchema.partial()

type createEventType = z.infer<typeof EventValidationSchema>;
type updateEventType = z.infer<typeof EventUpdateValidationSchema>;

export {
  EventValidationSchema,
  EventUpdateValidationSchema,
  type createEventType,
  type updateEventType,
};
