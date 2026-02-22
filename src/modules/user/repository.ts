import users from "./schema";
const selectQuery = {
  id: users.id,
  username: users.username,
  email: users.email,
  password: users.password,
  phone: users.phone,
  location: users.location,
  bio: users.bio,
  photo: users.photo,
  country: users.country,
  city: users.city,
  address: users.address,
  zip: users.zip,
  coverPhoto: users.coverPhoto,
  info: users.info,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
};

export default {
  selectQuery,
};
