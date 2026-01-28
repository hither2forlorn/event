import event from "./schema";

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

export default {
  selectQuery,
};
