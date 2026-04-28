import user_repository from "@/modules/user/repository";
import todo from "./schema";

const selectQuery = {
  id: todo.id,
  eventId: todo.eventId,
  task: todo.task,
  isDone: todo.isDone,
  assignedTo: todo.assignedTo,
  assignedUser: user_repository.selectQuery,
  title: todo.title,
  parentId: todo.parentId,
  category: todo.category,
  dueDate: todo.dueDate,
  status: todo.status,
  createdAt: todo.createdAt,
  updatedAt: todo.updatedAt,
};

export default {
  selectQuery,
};
