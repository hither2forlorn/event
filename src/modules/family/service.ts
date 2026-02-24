import { createFamilyValidation } from "./validators";
import Model from "./model";
import Resource from "./resource";
import { throwNotFoundError } from "@/utils/error";
import logger from "@/config/logger";

const create = async (input: createFamilyValidation, user: number) => {
  try {
    const { familyName } = input.body;

    const result = await Model.create({ familyName, createdBy: user });

    if (!result) {
      throw new Error("Failed to create family");
    }

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
      return throwNotFoundError("Family not found");
    }

    return Resource.toJson(result);
  } catch (err: any) {
    logger.error("Error in Family fetch:", err);
    throw err;
  }
};

const update = async (id: number, input: any) => {
  try {
    const existing = await Model.find(id);
    if (!existing) {
      return throwNotFoundError("Family not found");
    }

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
      return throwNotFoundError("Family not found");
    }

    const result = await Model.destroy(id);
    return result;
  } catch (err: any) {
    logger.error("Error in Family deletion:", err);
    throw err;
  }
};

export default {
  create,
  get,
  update,
  remove,
};
