import event, { event_guest_schema, event_member_schema } from "./schema";
import RSVP from "@/modules/rsvp/repository"
import User from "@/modules/user/repository"

const selectQuery = {
  id: event.id,
  title: event.title,
  description: event.description,
  type: event.type,
  startDate: event.startDate,
  endDate: event.endDate,
  budget: event.budget,
  theme: event.theme,
  parentId: event.parentId,
  location: event.location,
  organizer: event.organizer,
  createdAt: event.createdAt,
  updatedAt: event.updatedAt,
};

const SelectEventOwners = {
  userId: event_member_schema.userId,
  username: User.selectQuery.username,
  userEmail: User.selectQuery.email,
  userPhone: User.selectQuery.phone,
};

const selectEventGuest = {
  user: User,
  notes: event_guest_schema.notes,
  rsvp_status: RSVP.select.status,
  status: RSVP.select.status,
  familyId: RSVP.select.familyId,
  category: RSVP.select.category,
  invited_by: RSVP.select.invited_by
};

export default {
  selectQuery,
  selectEventGuest,
  SelectEventOwners,
};
