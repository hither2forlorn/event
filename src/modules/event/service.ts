import Model from "./model";
import Resource from "./resource";
import logger from "@/config/logger";
import {
  EventUpdateValidationSchema,
  EventValidationSchema,
} from "./validators";

const list = async (params: any) => {
  try {
    const data = await Model.findAllAndCount(params);
    return {
      ...data,
      items: Resource.collection(data.items as any),
    };
  } catch (err: any) {
    logger.error("Error in Category listing:", err);
    throw err;
  }
};

const create = async (input: any) => {
  try {
    // eventValidation.parse(input);
    const result = EventValidationSchema.safeParse(input);
    if (!result.success) {
      throw new Error(
        result.error.issues.map((issue) => issue.message).join(", "),
      );
    }

    // Convert date strings to Date objects
    const eventData = {
      ...input,
      startDate: new Date(input.startDate),
      endDate: new Date(input.endDate),
    };

    const data = await Model.create(eventData);
    if (data == undefined) {
      throw new Error("Something went wrong ");
    }
    return Resource.toJson(data as any);
  } catch (err: any) {
    logger.error("Error in Event creation:", err);
    throw err;
  }
};

const find = async (id: number) => {
  try {
    const data = await Model.find({ id });
    if (!data) throw new Error("Event not found");
    return Resource.toJson(data as any);
  } catch (err: any) {
    logger.error("Error in event finding:", err);
    throw err;
  }
};

const update = async (id: number, input: any) => {
  try {
    // Partial validation for update
    const result = EventUpdateValidationSchema.safeParse(input);

    if (!result.success) {
      throw new Error(
        result.error.issues.map((issue) => issue.message).join(", "),
      );
    }

    // Convert date strings to Date objects if present
    const eventData = {
      ...input,
      ...(input.startDate && { startDate: new Date(input.startDate) }),
      ...(input.endDate && { endDate: new Date(input.endDate) }),
    };

    const data = await Model.update(eventData, id);
    if (!data) throw new Error("event not found");
    return Resource.toJson(data as any);
  } catch (err: any) {
    logger.error("Error in event update:", err);
    throw err;
  }
};

const remove = async (id: number) => {
  try {
    const data = await Model.destroy(id);
    return data;
  } catch (err: any) {
    logger.error("Error in event deletion:", err);
    throw err;
  }
};

const listMyEvents = async (userId: number, params: any) => {
  try {
    const allParams = { ...params, organizer: userId };
    const data = await Model.findByUser(userId, allParams);
    return {
      ...data,
      items: data.items.map((item: any) => ({
        ...Resource.toJson(item.event as any),
        role: item.user_event?.role,
      })),
    };
  } catch (err: any) {
    logger.error("Error in Event listing by user:", err);
    throw err;
  }
};

export default {
  list,
  create,
  find,
  update,
  remove,
  listMyEvents,
};
