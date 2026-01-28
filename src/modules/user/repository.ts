import users from "./schema";
const selectQuery = {
  id: users.id,
  name: users.name,
  email: users.email,
  password: users.password,
  phone: users.phone,
  info: users.info,
  role: users.role,
  createdAt: users.createdAt,
};

export default {
  selectQuery,
};
