import users from "./schema";
const selectQuery = {
  id: users.id,
  email: users.email,
  password: users.password,
  info: users.info,
  role: users.role,
  createdAt: users.createdAt,
};

export default {
  selectQuery,
};
