import rsvp from "./schema";

const select = {
  id: rsvp.id,
  event_guest_id: rsvp.event_guest_id,
  responded_by: rsvp.responded_by,
  status: rsvp.status,
  notes: rsvp.notes,
  respondedAt: rsvp.respondedAt,
  updatedAt: rsvp.updatedAt,
};


export default {
  select,
};
