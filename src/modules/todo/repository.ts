import user_repository from "@/modules/user/repository";
import todo from "./schema";

const selectQuery = {
  id: todo.id,
  eventId: todo.eventId,
  task: todo.task,
  isDone: todo.isDone,
  assigned_to: todo.assigned_to,
  assigned_user: user_repository.selectQuery,
  title: todo.title,
  parentId: todo.parentId,
  categoty: todo.category,
  dueDate: todo.dueDate,
  status: todo.status,
  created_at: todo.created_at,
  updated_at: todo.updated_at,
};

export default {
  selectQuery,
};
