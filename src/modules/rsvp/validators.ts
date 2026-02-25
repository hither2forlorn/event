import z from "zod";
const validationRSVP = z.object({
  eventId: z.number(),
  userId: z.number(),
  invited_by: z.number().optional(),
  familyId: z.number().optional(),
  category: z.string().optional(),
  status: z.enum(["Pending", "Accepted", "Declined"]).default("Pending"),
});

export { validationRSVP };