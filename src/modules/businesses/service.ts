import Model from "./model";
import Resource from "./resource";
import logger from "@/config/logger";
import {
  BusinessValidationSchema,
  BusinessUpdateValidationSchema,
  type BusinessInputType,
  type BusinessUpdateType,
} from "./validators";
import { throwNotFoundError, throwErrorOnValidation } from "@/utils/error";

const list = async (params: any) => {
  try {
    const data = await Model.findAllAndCount(params);
    return {
      ...data,
      items: Resource.collection(data.items),
    };
  } catch (err: any) {
    logger.error("Error in Business listing:", err);
    throw err;
  }
};

const create = async (input: BusinessInputType, userId: number) => {
  try {
    const result = BusinessValidationSchema.safeParse(input);
    if (!result.success) {
      throw new Error(
        result.error.issues.map((issue) => issue.message).join(", "),
      );
    }

    // Check if business with same name exists for this user
    const existingBusiness = await Model.find({
      business_name: input.business_name,
      userId: userId,
    });

    if (existingBusiness) {
      throw new Error("Business with this name already exists");
    }

    const businessData = {
      ...input,
      userId: userId,
    };

    const data = await Model.create(businessData);
    if (!data || !data.id) {
      throw new Error("Business creation failed");
    }

    return Resource.toJson(data);
  } catch (err: any) {
    logger.error("Error in Business creation:", err);
    throw err;
  }
};

const find = async (id: number) => {
  try {
    const data = await Model.find({ id });
    if (!data) throw new Error("Business not found");
    return Resource.toJson(data);
  } catch (err: any) {
    logger.error("Error in Business finding:", err);
    throw err;
  }
};

const update = async (id: number, input: BusinessUpdateType, userId?: number) => {
  try {
    // Check if business exists
    const existingBusiness = await Model.find({ id });
    if (!existingBusiness) {
      return throwNotFoundError("Business not found");
    }

    // Check ownership if userId is provided
    if (userId && existingBusiness.userId !== userId) {
      throw new Error("Unauthorized: You do not own this business");
    }

    const result = BusinessUpdateValidationSchema.safeParse(input);
    if (!result.success) {
      throw new Error(
        result.error.issues.map((issue) => issue.message).join(", "),
      );
    }

    const data = await Model.update(input, id);
    if (!data) throw new Error("Business not found or update failed");
    return Resource.toJson(data);
  } catch (err: any) {
    logger.error("Error in Business update:", err);
    throw err;
  }
};

const remove = async (id: number, userId?: number) => {
  try {
    // Check if business exists
    const existingBusiness = await Model.find({ id });
    if (!existingBusiness) {
      return throwNotFoundError("Business not found");
    }

    // Check ownership if userId is provided
    if (userId && existingBusiness.userId !== userId) {
      throw new Error("Unauthorized: You do not own this business");
    }

    const data = await Model.destroy(id);
    if (!data || data.length === 0) {
      throw new Error("Business not found or already deleted");
    }

    return {
      success: true,
      message: "Business deleted successfully",
      deletedBusiness: Resource.toJson(data[0] as any),
    };
  } catch (err: any) {
    logger.error("Error in Business deletion:", err);
    throw err;
  }
};

const listMyBusinesses = async (userId: number) => {
  try {
    const data = await Model.findByUser(userId);
    return {
      items: Resource.collection(data),
      totalItems: data.length,
    };
  } catch (err: any) {
    logger.error("Error in Business listing by user:", err);
    throw err;
  }
};

export default {
  list,
  create,
  find,
  update,
  remove,
  listMyBusinesses,
};
