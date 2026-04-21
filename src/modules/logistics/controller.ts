import { type IAuthRequest } from "@/routes/index";
import Service from "./service";
import logger from "@/config/logger";
import { throwErrorOnValidation } from "@/utils/error";

const listVehicles = async (req: IAuthRequest) => {
  try {
    const { eventId } = req.params;
    const userId = req.user?.id;

    if (!eventId || isNaN(Number(eventId))) {
      throwErrorOnValidation("Invalid Event ID");
    }

    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }

    const data = await Service.listVehicles(Number(eventId), userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const findOne = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      throwErrorOnValidation("Invalid ID");
    }
    const data = await Service.findVehicle(Number(id));
    return data;
  } catch (err: any) {
    throw err;
  }
};

const create = async (req: IAuthRequest) => {
  try {
    const userId = req.user?.id;
    if (isNaN(Number(req.params.eventId))) {
      throwErrorOnValidation("Invalid event id ");
    }
    const eventId = Number(req.params.eventId);

    if (!userId) {
      throwErrorOnValidation("User is not authenticated");
    }
    console.log(eventId);
    const data = await Service.createVehicle(req.body, userId, eventId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const update = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!id || isNaN(Number(id))) {
      throwErrorOnValidation("Invalid ID");
    }
    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    const data = await Service.updateVehicle(Number(id), req.body, userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const deleteVehicle = async (req: IAuthRequest) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!id || isNaN(Number(id))) {
      throwErrorOnValidation("Invalid ID");
    }
    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    const data = await Service.deleteVehicle(Number(id), userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const assignVehicle = async (req: IAuthRequest) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    logger.debug("Trying to assign the vehicle");
    const data = await Service.assignVehicle(req.body, userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const getAssignmentsByVehicle = async (req: IAuthRequest) => {
  try {
    const { vehicleId } = req.params;
    const userId = req.user?.id;

    if (!vehicleId || isNaN(Number(vehicleId))) {
      throwErrorOnValidation("Invalid Vehicle ID");
    }

    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }

    const data = await Service.listAssignmentsByVehicle(Number(vehicleId), userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const updateAssignment = async (req: IAuthRequest) => {
  try {
    const { vehicleId, invitationId } = req.params;
    const userId = req.user?.id;
    if (!vehicleId || isNaN(Number(vehicleId)) || !invitationId || isNaN(Number(invitationId))) {
      throwErrorOnValidation("Invalid IDs");
    }
    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    const data = await Service.updateAssignment(Number(vehicleId), Number(invitationId), req.body, userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

const removeAssignment = async (req: IAuthRequest) => {
  try {
    const { vehicleId, invitationId } = req.params;
    const userId = req.user?.id;
    if (!vehicleId || isNaN(Number(vehicleId)) || !invitationId || isNaN(Number(invitationId))) {
      throwErrorOnValidation("Invalid IDs");
    }
    if (!userId) {
      throwErrorOnValidation("User not authenticated");
    }
    const data = await Service.removeAssignment(Number(vehicleId), Number(invitationId), userId);
    return data;
  } catch (err: any) {
    throw err;
  }
};

export default {
  listVehicles,
  findOne,
  create,
  update,
  deleteVehicle,
  assignVehicle,
  getAssignmentsByVehicle,
  updateAssignment,
  removeAssignment,
};
