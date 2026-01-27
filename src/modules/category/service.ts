import Model from "./model";
import Resource from "./resource";
import { categoryValidationSchema } from "./validators";
import logger from "@/config/logger";

const list = async (params: any) => {
  try {
    const data = await Model.findAllAndCount(params);

    return {
      ...data,
      items: Resource.collection(data.items),
    };
  } catch (err: any) {
    logger.error("Error in Category listing:", err);
    throw err;
  }
};

const create = async (input: any) => {
  try {
    categoryValidationSchema.parse(input);
    const data = await Model.create(input);
    if (data == undefined) {
      throw new Error("Something went wrong ");
    }
    return Resource.toJson(data);
  } catch (err: any) {
    logger.error("Error in Category creation:", err);
    throw err;
  }
};

const find = async (id: number) => {
  try {
    const data = await Model.find({ id });
    if (!data) throw new Error("Category not found");
    return Resource.toJson(data);
  } catch (err: any) {
    logger.error("Error in Category finding:", err);
    throw err;
  }
};

const update = async (id: number, input: any) => {
  try {
    // Partial validation for update
    categoryValidationSchema.partial().parse(input);
    const data = await Model.update(input, id);
    if (!data) throw new Error("Category not found");
    return Resource.toJson(data);
  } catch (err: any) {
    logger.error("Error in Category update:", err);
    throw err;
  }
};

const remove = async (id: number) => {
  try {
    const data = await Model.destroy(id);
    return data;
  } catch (err: any) {
    logger.error("Error in Category deletion:", err);
    throw err;
  }
};

export default {
  list,
  create,
  find,
  update,
  remove,
};
