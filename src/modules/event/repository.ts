import event from "./schema";

const selectQuery = {
  id: event.id,
  title: event.title,
  description: event.description,
  type: event.type,
  date: event.date,
  duration: event.duration,
  parentid: event.parentid,
  location: event.location,
  organizer: event.organizer,
  createdAt: event.createdAt,
  updatedAt: event.updatedAt,
};

export default {
  selectQuery,
};
