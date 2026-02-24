import { z } from "zod";
const EventValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  imageUrl: z
    .string()
    .optional()
    .default(
      "https://images.unsplash.com/photo-1522673607200-1645062cd5d1?w=800&q=80",
    ),
  type: z.string().default("WEDDING"),
  startDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .optional(),
  endDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .optional(),
  budget: z.number().int().min(0).optional(),
  theme: z.string().optional(),
  parentId: z.number().int().optional(),
  location: z.string().optional(),
});
const EventInvitation = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().optional(),
  eventId: z.number().int(),
});

type EventInvitationType = z.infer<typeof EventInvitation>;

const EventUpdateValidationSchema = EventValidationSchema.partial();

//Type extraction from the zod
type createEventType = z.infer<typeof EventValidationSchema>;
type updateEventType = z.infer<typeof EventUpdateValidationSchema>;

export {
  EventValidationSchema,
  EventUpdateValidationSchema,
  EventInvitation,
  type createEventType,
  type updateEventType,
  type EventInvitationType,
};
