import { type IAuthRequest } from "@/routes/index";
import * as Service from "./service";
import { throwErrorOnValidation } from "@/utils/error";

const get = async (req: IAuthRequest) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    const data = await Service.listCaterings({ ...req.query, userId });
    return data;
  } catch (err: any) {
    throw err;
  }
};

const findOne = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    if (!id || isNaN(Number(id))) {
      throwErrorOnValidation("Invalid catering ID");
    }
    const data = await Service.findCateringById(Number(id), userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const create = async (req: IAuthRequest) => {
  try {
    const userId = req.user?.id;
    const { eventId } = req.params;

    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    if (!eventId || isNaN(Number(eventId))) {
      throwErrorOnValidation("Invalid event ID");
    }

    const data = await Service.createCatering(req.body, Number(eventId), userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const update = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    if (!id || isNaN(Number(id))) {
      throwErrorOnValidation("Invalid catering ID");
    }

    const data = await Service.updateCatering(Number(id), req.body, userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const remove = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    if (!id || isNaN(Number(id))) {
      throwErrorOnValidation("Invalid catering ID");
    }

    const data = await Service.deleteCatering(Number(id), userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const createMenuItem = async (req: IAuthRequest) => {
  try {
    const userId = req.user?.id;
    const { cateringId } = req.params;

    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    if (!cateringId || isNaN(Number(cateringId))) {
      throwErrorOnValidation("Invalid catering ID");
    }

    const data = await Service.createMenuItem(req.body, Number(cateringId), userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const getMenuItems = async (req: IAuthRequest) => {
  try {
    const { cateringId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    if (!cateringId || isNaN(Number(cateringId))) {
      throwErrorOnValidation("Invalid catering ID");
    }

    const data = await Service.listMenuItems(Number(cateringId), userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const updateMenuItem = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    if (!id || isNaN(Number(id))) {
      throwErrorOnValidation("Invalid menu item ID");
    }

    const data = await Service.updateMenuItem(Number(id), req.body, userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const deleteMenuItem = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    if (!id || isNaN(Number(id))) {
      throwErrorOnValidation("Invalid menu item ID");
    }

    const data = await Service.deleteMenuItem(Number(id), userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

export default {
  get,
  findOne,
  create,
  update,
  remove,
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
};
