import { type IAuthRequest } from "@/routes/index";
import * as Service from "./service";
import CateringModel from "./model";
import BusinessModel from "@/modules/businesses/model";
import EventService from "@/modules/event/service";
import { throwErrorOnValidation, throwForbiddenError } from "@/utils/error";

/**
 * Check if user is authorized to access catering
 * User is authorized if they are the event owner OR the vendor owner
 */
const isAuthorized = async (
  eventId: number,
  cateringId: number | null,
  userId: number,
): Promise<boolean> => {
  try {
    const event = await EventService.find(eventId);
    if (!event) {
      return false;
    }

    // Allow if user is the event owner
    if (event.userId === userId) {
      return true;
    }

    // If cateringId provided, check if user is the vendor owner
    if (cateringId) {
      const catering = await CateringModel.findCateringById(cateringId);
      if (catering?.vendorId) {
        const vendor = await BusinessModel.findById(catering.vendorId);
        if (vendor && vendor.owner_id === userId) {
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    return false;
  }
};

const get = async (req: IAuthRequest) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return throwErrorOnValidation("User not authenticated");
    }
    const data = await Service.listCaterings({ ...req?.query });
    return data;
  } catch (err: any) {
    throw err;
  }
};

const findOne = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return throwErrorOnValidation("Invalid catering ID");
    }
    const data = await Service.findCateringById(Number(id));
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
      return throwErrorOnValidation("User not authenticated");
    }

    if (!eventId || isNaN(Number(eventId))) {
      return throwErrorOnValidation("Invalid event ID");
    }

    const authorized = await isAuthorized(Number(eventId), null, userId);
    if (!authorized) {
      return throwForbiddenError(
        "You do not have permission to add catering to this event",
      );
    }

    const data = await Service.createCatering(
      req.body,
      Number(eventId),
      userId,
    );
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
      return throwErrorOnValidation("User not authenticated");
    }

    if (!id || isNaN(Number(id))) {
      return throwErrorOnValidation("Invalid catering ID");
    }

    const catering = await CateringModel.findCateringById(Number(id));
    if (!catering) {
      return throwErrorOnValidation("Catering not found");
    }

    const authorized = await isAuthorized(catering.eventId, Number(id), userId);
    if (!authorized) {
      return throwForbiddenError(
        "You do not have permission to update this catering",
      );
    }

    const data = await Service.updateCatering(Number(id), req.body, userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const deleteModule = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return throwErrorOnValidation("User not authenticated");
    }

    if (!id || isNaN(Number(id))) {
      return throwErrorOnValidation("Invalid catering ID");
    }

    const catering = await CateringModel.findCateringById(Number(id));
    if (!catering) {
      return throwErrorOnValidation("Catering not found");
    }

    const authorized = await isAuthorized(catering.eventId, Number(id), userId);
    if (!authorized) {
      return throwForbiddenError(
        "You do not have permission to delete this catering",
      );
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
      return throwErrorOnValidation("User not authenticated");
    }

    if (!cateringId || isNaN(Number(cateringId))) {
      return throwErrorOnValidation("Invalid catering ID");
    }

    const catering = await CateringModel.findCateringById(Number(cateringId));
    if (!catering) {
      return throwErrorOnValidation("Catering not found");
    }

    const authorized = await isAuthorized(
      catering.eventId,
      Number(cateringId),
      userId,
    );
    if (!authorized) {
      return throwForbiddenError(
        "You do not have permission to add menu items to this catering",
      );
    }

    const data = await Service.createMenuItem(
      req.body,
      Number(cateringId),
      userId,
    );
    return data;
  } catch (err: any) {
    throw err;
  }
};

const getMenuItems = async (req: IAuthRequest) => {
  try {
    const { cateringId } = req.params;

    if (!cateringId || isNaN(Number(cateringId))) {
      return throwErrorOnValidation("Invalid catering ID");
    }

    const data = await Service.listMenuItems(Number(cateringId));
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
      return throwErrorOnValidation("User not authenticated");
    }

    if (!id || isNaN(Number(id))) {
      return throwErrorOnValidation("Invalid menu item ID");
    }

    const menuItem = await CateringModel.findMenuItemById(Number(id));
    if (!menuItem) {
      return throwErrorOnValidation("Menu item not found");
    }

    const catering = await CateringModel.findCateringById(menuItem.cateringId);
    if (!catering) {
      return throwErrorOnValidation("Catering not found");
    }

    const authorized = await isAuthorized(
      catering.eventId,
      catering.id,
      userId,
    );
    if (!authorized) {
      return throwForbiddenError(
        "You do not have permission to update this menu item",
      );
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
      return throwErrorOnValidation("User not authenticated");
    }

    if (!id || isNaN(Number(id))) {
      return throwErrorOnValidation("Invalid menu item ID");
    }

    const menuItem = await CateringModel.findMenuItemById(Number(id));
    if (!menuItem) {
      return throwErrorOnValidation("Menu item not found");
    }

    const catering = await CateringModel.findCateringById(menuItem.cateringId);
    if (!catering) {
      return throwErrorOnValidation("Catering not found");
    }

    const authorized = await isAuthorized(
      catering.eventId,
      catering.id,
      userId,
    );
    if (!authorized) {
      return throwForbiddenError(
        "You do not have permission to delete this menu item",
      );
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
  deleteModule,
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
};
