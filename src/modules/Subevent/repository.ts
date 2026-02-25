import event, { event_member_schema } from "./schema";
import user from "@/modules/user/schema";

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

const selectQueryForUserRelatedToEvent = {
  userId: event_member_schema.userId,
  role: event_member_schema.role,
  username: user.username,
  userEmail: user.email,
  userPhone: user.phone,
};
const selectEventGuest = {
  evnetId: event.id,
};

export default {
  selectQuery,
  selectEventGuest,
  selectQueryForUserRelatedToEvent,
};
