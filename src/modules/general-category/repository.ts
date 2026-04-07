import generalCategory from "./schema";

const selectQuery = {
  id: generalCategory.id,
  name: generalCategory.name,
  type: generalCategory.type,
};

export default {
  selectQuery,
};
