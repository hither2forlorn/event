import family from "./schema";
const selectQuery = {
  id: family.id,
  familyName: family.familyName,
  createdBy: family.createdBy,
  createdAt: family.createdAt,
  updatedAt: family.updatedAt,
};

export default {
  selectQuery,
};
