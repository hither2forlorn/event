import z from "zod";
import { invitationStatus } from "@/constant";

const validationRSVP = z.object({
  eventId: z.number(),
  userId: z.number(),
  invited_by: z.number().optional(),
  familyId: z.number().optional(),
  category: z.string().optional(),
});

const invitationStatusValidation = z.enum([
  invitationStatus.invited,
  invitationStatus.accepted,
  invitationStatus.rejected,
]);

const invitation_responceValidation = z.object({
  invitationId: z.number(),// For which the invitation is made
  usersId: z.number().array(),
})

export { validationRSVP, invitationStatusValidation, invitation_responceValidation };
