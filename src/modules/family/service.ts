import {
  type AddMemberValidation,
  type CreateFamilyValidation,
  type UpdateFamilyValidation,
  type UpdateMemberValidation,
} from "./validators";
import Model from "./model";
import Resource from "./resource";
import { throwNotFoundError } from "@/utils/error";
import logger from "@/config/logger";
import userModel from "@/modules/user/model";

const create = async (input: CreateFamilyValidation["body"], user: number) => {
  try {
    const existedFamily = await Model.findIfUserHasFamily(user);

    if (existedFamily) {
      throw new Error("User already has a family");
    }

    const { familyName } = input;

    const result = await Model.create({ familyName, createdBy: user });

    if (!result) {
      throw new Error("Failed to create family");
    }

    const creator = await userModel.find({ id: user });
    if (!creator) {
      throw new Error("Creator user not found");
    }

    await Model.addMemberIfUser(result.id, user, user, {
      relation: "self",
      dob: new Date(),
      name: creator.username || creator.email,
      email: creator.email,
    });

    return Resource.toJson(result);
  } catch (err: any) {
    logger.error("Error in Family creation:", err);
    throw err;
  }
};

const get = async (id: number) => {
  try {
    const result = await Model.find(id);
    if (!result) {
      return throwNotFoundError("Family");
    }

    return Resource.toJson(result);
  } catch (err: any) {
    logger.error("Error in Family fetch:", err);
    throw err;
  }
};

const update = async (id: number, input: UpdateFamilyValidation["body"]) => {
  try {
    const existing = await Model.find(id);
    if (!existing) {
      return throwNotFoundError("Family");
    }

    console.log(input);

    const result = await Model.update(input, id);
    if (!result) {
      throw new Error("Failed to update family");
    }

    return Resource.toJson(result);
  } catch (err: any) {
    logger.error("Error in Family update:", err);
    throw err;
  }
};

const remove = async (id: number) => {
  try {
    const existing = await Model.find(id);
    if (!existing) {
      return throwNotFoundError("Family");
    }

    const result = await Model.destroyWithMembers(id);
    return result;
  } catch (err: any) {
    logger.error("Error in Family deletion:", err);
    throw err;
  }
};

const addMember = async (
  familyId: number,
  addedBy: number,
  input: AddMemberValidation["body"],
) => {
  try {
    await get(familyId);

    const user = await userModel.find({ email: input.email });

    let userId;

    if (user) {
      userId = user.id;
      input.name = user.username ? user.username : input.name;
    } else {
      const newUser = await userModel.create({
        email: input.email,
      } as any);
      if (!newUser) {
        throw new Error("Failed to create user for family member");
      }
      userId = newUser.id;
    }

    const result = await Model.addMemberIfUser(
      familyId,
      addedBy,
      userId,
      input,
    );

    if (!result) {
      throw new Error("Failed to add member to family");
    }

    return Resource.toJsonMember(result);
  } catch (error) {
    throw error;
  }
};

const listMembers = async (familyId: number) => {
  try {
    await get(familyId);
    const members = await Model.getMembers(familyId);
    return Resource.collectionMembers(members as any);
  } catch (error) {
    throw error;
  }
};

const getMemberDetails = async (familyId: number, memberId: number) => {
  try {
    await get(familyId);

    const member = await Model.getMember(familyId, memberId);
    if (!member) {
      return throwNotFoundError("Family member");
    }

    return Resource.toJsonMember(member as any);
  } catch (error) {
    throw error;
  }
};

const updateMember = async (
  familyId: number,
  memberId: number,
  input: UpdateMemberValidation["body"],
) => {
  try {
    await get(familyId);

    const existingMember = await Model.getMember(familyId, memberId);
    if (!existingMember) {
      return throwNotFoundError("Family member");
    }

    const result = await Model.updateMember(familyId, memberId, input);
    if (!result) {
      throw new Error("Failed to update family member");
    }

    return Resource.toJsonMember(result as any);
  } catch (error) {
    throw error;
  }
};

const removeMember = async (familyId: number, memberId: number) => {
  try {
    await get(familyId);

    const existingMember = await Model.getMember(familyId, memberId);
    if (!existingMember) {
      return throwNotFoundError("Family member");
    }

    return await Model.removeMember(familyId, memberId);
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  get,
  update,
  remove,
  addMember,
  listMembers,
  getMemberDetails,
  updateMember,
  removeMember,
};
