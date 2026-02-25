import { family, family_member_schema } from "./schema";
const selectQuery = {
  id: family.id,
  familyName: family.familyName,
  createdBy: family.createdBy,
  createdAt: family.createdAt,
  updatedAt: family.updatedAt,
};

const selectMemersQuery = {
  familyId: family_member_schema.familyId,
  userId: family_member_schema.userId,
  relation: family_member_schema.relation,
  dob: family_member_schema.dob,
  name: family_member_schema.name,
  email: family_member_schema.email,
  addedBy: family_member_schema.addedBy,
  createdAt: family_member_schema.createdAt,
  updatedAt: family_member_schema.updatedAt,
};

export default {
  selectQuery,
  selectMemersQuery,
};
