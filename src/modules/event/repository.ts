import event, { event_member_schema } from "./schema";
import User from "@/modules/user/repository"

const selectQuery = {
  id: event.id,
  title: event.title,
  description: event.description,
  type: event.type,
  startDateTime: event.startDateTime,
  endDateTime: event.endDateTime,
  budget: event.budget,
  theme: event.theme,
  parentId: event.parentId,
  location: event.location,
  organizer: event.organizer,
  createdAt: event.createdAt,
  role: event_member_schema.role,
  event_member_userId: event_member_schema.userId,
  updatedAt: event.updatedAt,
};

const SelectEventOwners = {
  user: User.selectQuery,
  role: event_member_schema.role
};



export default {
  selectQuery,
  SelectEventOwners,
};
