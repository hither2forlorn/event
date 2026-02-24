import z from "zod";
const validationRSVP = z.object({
  eventId: z.number(),
  userId: z.number(),
  status: z.enum(["Pending", "Accepted", "Declined"]).default("Pending"),
});

export { validationRSVP };