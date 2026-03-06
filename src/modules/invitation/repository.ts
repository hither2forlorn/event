import rsvp from "./schema";
const select = {
  id: rsvp.id,
  eventId: rsvp.eventId,
  familyId: rsvp.familyId,
  category: rsvp.category,
  updatedAt: rsvp.updatedAt,
  invited_by: rsvp.invited_by,
  status: rsvp.status, // accepted, declined, pending
};
export default {
  select,
};
