import Model from "./model";
import Resource from "./resource";
import logger from "@/config/logger";
import { throwNotFoundError } from "@/utils/error";

const list = async (params: any) => {
  try {
    const data = await Model.findAllAndCount({ ...params });
    return Resource.collection(data.items);
  } catch (err: any) {
    logger.error("Error in GeneralCategory listing:", err);
    throw err;
  }
};

const find = async (id: number) => {
  try {
    const data = await Model.find({ id });
    if (!data) throwNotFoundError("General Category not found");

    return Resource.toJson(data as any);
  } catch (err: any) {
    logger.error("Error in GeneralCategory finding:", err);
    throw err;
  }
};

const create = async (input: any) => {
  try {
    const data = await Model.create(input);
    if (!data) throw new Error("GeneralCategory creation failed");

    return Resource.toJson(data);
  } catch (err: any) {
    logger.error("Error in GeneralCategory create:", err);
    throw err;
  }
};

const update = async (id: number, input: any) => {
  try {
    const existing = await Model.find({ id });
    if (!existing) throwNotFoundError("General Category not found");

    const data = await Model.update(input, id);
    if (!data) throw new Error("General Category not found or update failed");

    return Resource.toJson(data);
  } catch (err: any) {
    logger.error("Error in GeneralCategory update:", err);
    throw err;
  }
};

const deleteCategory = async (id: number) => {
  try {
    const existing = await Model.find({ id });
    if (!existing) throwNotFoundError("General Category not found");

    const deleted_data = await Model.delete(id);
    return deleted_data;
  } catch (err: any) {
    logger.error("Error in GeneralCategory delete:", err);
    throw err;
  }
};

export default {
  list,
  find,
  create,
  update,
  deleteCategory,
};
