import users from "./schema";
const selectQuery = {
  id: users.id,
  name: users.name,
  email: users.email,
  password: users.password,
  phone: users.phone,
  location: users.location,
  foodPreference: users.foodPreference,
  bio: users.bio,
  photo: users.photo,
  country: users.country,
  city: users.city,
  address: users.address,
  zip: users.zip,
  coverPhoto: users.coverPhoto,
  info: users.info,
  role: users.role,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
};

export default {
  selectQuery,
};
